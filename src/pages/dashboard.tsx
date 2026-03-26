// Required: npm install recharts lucide-react
// Optional: npm install date-fns (for cleaner date formatting)

import React, { useMemo, useState, useCallback } from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  BookOpen,
  Star,
  GitFork,
  Code2,
  RefreshCw,
  AlertCircle,
  Info,
} from "lucide-react";

import StatCard from "../components/StatCard/StatCard";
import WakaTimeEmbed from "../components/WakaTimeEmbed/WakaTimeEmbed";
import { useGitHubData, GitHubRepo } from "../hooks/useGitHubData";
import {
  GITHUB_USERNAME,
  FEATURED_REPO,
  MAX_REPOS_DISPLAYED,
  MAX_REPO_SELECTOR_OPTIONS,
  COMMIT_CHART_TICK_INTERVAL,
  WAKATIME_EMBEDS,
} from "../config/dashboardConfig";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";

import styles from "./dashboard.module.css";

// ── Helpers ────────────────────────────────────────────────────────────────

/** Format a Unix epoch second as "MMM W#" */
function formatWeekLabel(epochSec: number): string {
  const d = new Date(epochSec * 1000);
  const month = d.toLocaleString("default", { month: "short" });
  // ISO week within the month (approx)
  const weekOfMonth = Math.ceil(d.getDate() / 7);
  return `${month} W${weekOfMonth}`;
}

/** Get quarter string from ISO date string */
function toQuarter(isoDate: string): string {
  const d = new Date(isoDate);
  const q = Math.floor(d.getMonth() / 3) + 1;
  return `Q${q} ${d.getFullYear()}`;
}

/** Count mode (most common) of a string array */
function mode(arr: string[]): string {
  const freq: Record<string, number> = {};
  let maxVal = "";
  let maxCount = 0;
  for (const item of arr) {
    freq[item] = (freq[item] ?? 0) + 1;
    if (freq[item] > maxCount) {
      maxCount = freq[item];
      maxVal = item;
    }
  }
  return maxVal;
}

/** Read a CSS variable from the document (client-side only) */
function cssVar(name: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

// Donut chart colour palette — site palette
const LANG_COLORS = [
  "#DD7596",
  "#B7C3F3",
  "#83AFDF",
  "#ECDA90",
  "#9F7EBE",
  "#63C5EA",
  "#CF1259",
  "#8716f1",
];

// ── Skeleton loading ───────────────────────────────────────────────────────

function LoadingSkeleton(): JSX.Element {
  return (
    <>
      <div className={styles.statGrid}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={styles.skeletonCard} />
        ))}
      </div>
      <div className={styles.chartGrid}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={styles.skeletonChart} />
        ))}
      </div>
    </>
  );
}

// ── Tooltip styled with theme ──────────────────────────────────────────────

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color?: string }>;
  label?: string;
}

function ThemedTooltip({ active, payload, label }: TooltipProps): JSX.Element | null {
  if (!active || !payload?.length) return null;
  const bg = cssVar("--ifm-background-color", "#fff");
  const border = cssVar("--ifm-color-primary", "#DD7596");
  const color = cssVar("--ifm-font-color-base", "#333");
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 8,
        padding: "0.5rem 0.75rem",
        color,
        fontSize: "0.85rem",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {label && <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>}
      {payload.map((p) => (
        <p key={p.name} style={{ margin: "0.15rem 0", color: p.color ?? color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function DashboardPage(): JSX.Element {
  const [commitRepo, setCommitRepo] = useState<string>(FEATURED_REPO);

  const { data, isLoading, error, isDemoMode, refetch, lastUpdated } = useGitHubData(
    GITHUB_USERNAME,
    commitRepo
  );

  // ── Derived KPIs ──────────────────────────────────────────────────────
  const kpis = useMemo(() => {
    if (!data) return null;
    const { repos } = data;
    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
    const languages = repos
      .map((r) => r.language)
      .filter((l): l is string => !!l);
    const topLang = languages.length ? mode(languages) : "N/A";
    return {
      totalRepos: repos.length,
      totalStars,
      totalForks,
      topLang,
    };
  }, [data]);

  // ── Commit activity chart data ─────────────────────────────────────────
  const commitChartData = useMemo(() => {
    if (!data?.commitActivity || !Array.isArray(data.commitActivity)) return [];
    return data.commitActivity.map((w) => ({
      week: formatWeekLabel(w.week),
      commits: w.total,
    }));
  }, [data]);

  // ── Top repos bar chart data ───────────────────────────────────────────
  const topReposData = useMemo(() => {
    if (!data) return [];
    return [...data.repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, MAX_REPOS_DISPLAYED)
      .map((r) => ({ name: r.name, stars: r.stargazers_count }));
  }, [data]);

  // ── Language donut data ────────────────────────────────────────────────
  const langData = useMemo(() => {
    if (!data) return [];
    const freq: Record<string, number> = {};
    for (const r of data.repos) {
      if (r.language) freq[r.language] = (freq[r.language] ?? 0) + 1;
    }
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }));
  }, [data]);

  // ── Repo timeline area chart data ─────────────────────────────────────
  const timelineData = useMemo(() => {
    if (!data) return [];
    const quarterlyCounts: Record<string, number> = {};
    for (const r of data.repos) {
      const q = toQuarter(r.created_at);
      quarterlyCounts[q] = (quarterlyCounts[q] ?? 0) + 1;
    }
    const sorted = Object.entries(quarterlyCounts).sort(([a], [b]) =>
      a < b ? -1 : 1
    );
    let cumulative = 0;
    return sorted.map(([quarter, count]) => {
      cumulative += count;
      return { quarter, cumulative };
    });
  }, [data]);

  // ── Repo selector for commit chart ────────────────────────────────────
  const handleRepoChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCommitRepo(e.target.value);
    },
    []
  );

  const primaryColor = cssVar("--ifm-color-primary", "#2e8555");

  return (
    <Layout
      title="Developer Metrics"
      description="Live GitHub activity and coding stats"
    >
      <main className={styles.page}>
        {/* ── Hero banner ──────────────────────────────────────────────── */}
        <div className={`${styles.heroBanner} blog-hero-bg`}>
          <FadeInOnScroll direction="down">
            <h1 className={styles.heroTitle}>Developer Metrics</h1>
            <p className={styles.heroSubtitle}>Live GitHub activity and coding stats</p>
          </FadeInOnScroll>
          <div className={styles.gradientBar} />
        </div>

        {/* ── Meta bar ──────────────────────────────────────────────── */}
        <div className={styles.metaBar}>
          <span className={styles.metaTimestamp}>
            {lastUpdated
              ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
              : "Fetching data…"}
          </span>
          <motion.button
            className={styles.refreshBtn}
            onClick={refetch}
            disabled={isLoading}
            aria-label="Refresh GitHub data"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              animate={{ rotate: isLoading ? 360 : 0 }}
              transition={
                isLoading
                  ? { repeat: Infinity, duration: 1, ease: "linear" }
                  : { duration: 0.3 }
              }
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <RefreshCw size={14} />
            </motion.span>
            {isLoading ? "Loading…" : "Refresh"}
          </motion.button>
        </div>

        {/* ── Status banners ────────────────────────────────────────── */}
        {isDemoMode && (
          <div className={styles.noticeBanner} role="status">
            <Info size={16} className={styles.noticeIcon} />
            <span>
              Showing sample data — GitHub API is currently unavailable.{" "}
              <button
                className={styles.noticeBannerRefresh}
                onClick={refetch}
                disabled={isLoading}
              >
                Try again
              </button>
            </span>
          </div>
        )}
        {error && !isDemoMode && (
          <div className={styles.errorBox} role="alert">
            <AlertCircle size={20} className={styles.errorIcon} />
            <div>
              <p className={styles.errorTitle}>Could not load GitHub data</p>
              <p className={styles.errorMsg}>{error}</p>
            </div>
          </div>
        )}

        {/* ── GitHub Activity ───────────────────────────────────────── */}
        <h2 className={styles.sectionTitle}>GitHub Activity</h2>

        {isLoading && <LoadingSkeleton />}

        {!isLoading && kpis && (
          <>
            {/* Row 1 — Stat cards */}
            <StaggerContainer className={styles.statGrid} staggerDelay={0.1}>
              <StaggerItem>
                <StatCard
                  icon={<BookOpen size={28} />}
                  value={kpis.totalRepos}
                  label="Public Repos"
                />
              </StaggerItem>
              <StaggerItem>
                <StatCard
                  icon={<Star size={28} />}
                  value={kpis.totalStars}
                  label="Total Stars"
                />
              </StaggerItem>
              <StaggerItem>
                <StatCard
                  icon={<GitFork size={28} />}
                  value={kpis.totalForks}
                  label="Total Forks"
                />
              </StaggerItem>
              <StaggerItem>
                <StatCard
                  icon={<Code2 size={28} />}
                  value={kpis.topLang}
                  label="Top Language"
                />
              </StaggerItem>
            </StaggerContainer>

            {/* Row 2 — Charts */}
            <StaggerContainer className={styles.chartGrid} staggerDelay={0.12}>
              {/* Chart 1 — Commit Activity */}
              <StaggerItem>
                <div className={styles.chartCard}>
                  <div className={styles.chartHeader}>
                    <h3 className={styles.chartTitle}>Commit Activity</h3>
                    {data && data.repos.length > 0 && !isDemoMode && (
                      <select
                        className={styles.repoSelect}
                        value={commitRepo}
                        onChange={handleRepoChange}
                        aria-label="Select repository for commit activity"
                      >
                        {data.repos.slice(0, MAX_REPO_SELECTOR_OPTIONS).map((r: GitHubRepo) => (
                          <option key={r.id} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  {commitChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={commitChartData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={cssVar("--ifm-color-emphasis-200", "#eee")}
                        />
                        <XAxis
                          dataKey="week"
                          tick={{ fontSize: 10 }}
                          interval={COMMIT_CHART_TICK_INTERVAL}
                          stroke={cssVar("--ifm-color-emphasis-500", "#999")}
                        />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          stroke={cssVar("--ifm-color-emphasis-500", "#999")}
                        />
                        <Tooltip content={<ThemedTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="commits"
                          stroke={primaryColor}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <p style={{ color: "var(--ifm-color-emphasis-600)", fontSize: "0.9rem" }}>
                      No commit activity data available for this repo.
                    </p>
                  )}
                </div>
              </StaggerItem>

              {/* Chart 2 — Top Repos by Stars */}
              <StaggerItem>
                <div className={styles.chartCard}>
                  <h3 className={styles.chartTitle}>Top Repos by Stars</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                      data={topReposData}
                      layout="vertical"
                      margin={{ left: 8, right: 8 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={cssVar("--ifm-color-emphasis-200", "#eee")}
                      />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 10 }}
                        stroke={cssVar("--ifm-color-emphasis-500", "#999")}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 10 }}
                        width={90}
                        stroke={cssVar("--ifm-color-emphasis-500", "#999")}
                      />
                      <Tooltip content={<ThemedTooltip />} />
                      <Bar dataKey="stars" fill={primaryColor} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </StaggerItem>

              {/* Chart 3 — Language Breakdown */}
              <StaggerItem>
                <div className={styles.chartCard}>
                  <h3 className={styles.chartTitle}>Language Breakdown</h3>
                  {langData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={langData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                          nameKey="name"
                          label={({ name }) => name}
                          labelLine={false}
                        >
                          {langData.map((_entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={LANG_COLORS[index % LANG_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<ThemedTooltip />} />
                        <Legend
                          iconType="circle"
                          iconSize={8}
                          wrapperStyle={{ fontSize: "0.75rem" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p style={{ color: "var(--ifm-color-emphasis-600)", fontSize: "0.9rem" }}>
                      No language data available.
                    </p>
                  )}
                </div>
              </StaggerItem>

              {/* Chart 4 — Repo Creation Timeline */}
              <StaggerItem>
                <div className={styles.chartCard}>
                  <h3 className={styles.chartTitle}>Repo Creation Timeline</h3>
                  {timelineData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={timelineData}>
                        <defs>
                          <linearGradient
                            id="timelineGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={primaryColor}
                              stopOpacity={0.35}
                            />
                            <stop
                              offset="95%"
                              stopColor={primaryColor}
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={cssVar("--ifm-color-emphasis-200", "#eee")}
                        />
                        <XAxis
                          dataKey="quarter"
                          tick={{ fontSize: 9 }}
                          interval="preserveStartEnd"
                          stroke={cssVar("--ifm-color-emphasis-500", "#999")}
                        />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          stroke={cssVar("--ifm-color-emphasis-500", "#999")}
                        />
                        <Tooltip content={<ThemedTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="cumulative"
                          stroke={primaryColor}
                          strokeWidth={2}
                          fill="url(#timelineGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <p style={{ color: "var(--ifm-color-emphasis-600)", fontSize: "0.9rem" }}>
                      No timeline data available.
                    </p>
                  )}
                </div>
              </StaggerItem>
            </StaggerContainer>
          </>
        )}

        {/* ── Section Divider ───────────────────────────────────────── */}
        <div className={styles.divider} />

        {/* ── WakaTime Coding Stats ──────────────────────────────────── */}
        <h2 className={styles.sectionTitle}>Coding Stats</h2>

        <StaggerContainer className={styles.wakaGrid} staggerDelay={0.1}>
          {WAKATIME_EMBEDS.map((embed) => (
            <StaggerItem key={embed.url}>
              <WakaTimeEmbed label={embed.label} url={embed.url} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className={styles.wakaCaption}>
          Powered by{" "}
          <a href="https://wakatime.com" target="_blank" rel="noopener noreferrer">
            WakaTime
          </a>
        </p>
      </main>
    </Layout>
  );
}
