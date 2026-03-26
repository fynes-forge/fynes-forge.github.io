import { useState, useEffect, useCallback } from "react";
import {
  FEATURED_REPO as FEATURED_REPO_PLACEHOLDER,
  DEMO_REPOS,
  DEMO_COMMIT_ACTIVITY,
} from "../config/dashboardConfig";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  html_url: string;
  topics: string[];
}

export interface CommitWeek {
  week: number;
  total: number;
  days: number[];
}

export interface GitHubData {
  repos: GitHubRepo[];
  commitActivity: CommitWeek[] | null;
  commitRepo: string;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function getCached<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage unavailable (SSR or quota exceeded) — ignore
  }
}

async function fetchWithRateLimit<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (response.status === 403 || response.status === 429) {
    const resetHeader = response.headers.get("X-RateLimit-Reset");
    const resetTime = resetHeader
      ? new Date(parseInt(resetHeader, 10) * 1000).toLocaleTimeString()
      : "a while";
    throw new Error(
      `GitHub API rate limit exceeded. Resets at ${resetTime}. Please try again later.`
    );
  }
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

interface UseGitHubDataResult {
  data: GitHubData | null;
  isLoading: boolean;
  error: string | null;
  /** True when data comes from the built-in sample set (GitHub API unavailable) */
  isDemoMode: boolean;
  refetch: () => void;
  lastUpdated: Date | null;
}

export function useGitHubData(
  username: string,
  featuredRepo: string
): UseGitHubDataResult {
  const [data, setData] = useState<GitHubData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const refetch = useCallback(() => {
    // Clear cache so next fetch is fresh
    try {
      localStorage.removeItem(`gh_repos_${username}`);
      localStorage.removeItem(`gh_commits_${username}_${featuredRepo}`);
    } catch {
      // ignore
    }
    setFetchCount((c) => c + 1);
  }, [username, featuredRepo]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        // --- Repos ---
        const reposCacheKey = `gh_repos_${username}`;
        let repos = getCached<GitHubRepo[]>(reposCacheKey);
        if (!repos) {
          repos = await fetchWithRateLimit<GitHubRepo[]>(
            `https://api.github.com/users/${username}/repos?sort=stars&per_page=100`
          );
          setCache(reposCacheKey, repos);
        }

        // --- Commit Activity ---
        // Use provided featuredRepo, or fall back to most-starred repo
        const targetRepo =
          featuredRepo && featuredRepo !== FEATURED_REPO_PLACEHOLDER
            ? featuredRepo
            : repos[0]?.name ?? "";

        let commitActivity: CommitWeek[] | null = null;
        if (targetRepo) {
          const commitsCacheKey = `gh_commits_${username}_${targetRepo}`;
          const cached = getCached<unknown>(commitsCacheKey);
          // Guard: cached value must be an actual array (not a stale {} from a 202 response)
          if (Array.isArray(cached)) {
            commitActivity = cached as CommitWeek[];
          }
          if (!commitActivity) {
            try {
              const raw = await fetchWithRateLimit<unknown>(
                `https://api.github.com/repos/${username}/${targetRepo}/stats/commit_activity`
              );
              // GitHub returns {} (HTTP 202) while stats are being computed — not an array
              if (Array.isArray(raw)) {
                commitActivity = raw as CommitWeek[];
                setCache(commitsCacheKey, commitActivity);
              } else {
                commitActivity = null;
              }
            } catch {
              // Non-fatal: commit activity is optional
              commitActivity = null;
            }
          }
        }

        if (!cancelled) {
          setIsDemoMode(false);
          setData({ repos, commitActivity, commitRepo: targetRepo });
          setLastUpdated(new Date());
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          // Fall back to sample data so charts are always visible
          setIsDemoMode(true);
          setData({
            repos: DEMO_REPOS as GitHubRepo[],
            commitActivity: DEMO_COMMIT_ACTIVITY,
            commitRepo: DEMO_REPOS[0]?.name ?? "",
          });
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username, featuredRepo, fetchCount]);

  return { data, isLoading, error, isDemoMode, refetch, lastUpdated };
}
