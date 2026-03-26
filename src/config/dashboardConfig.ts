export const GITHUB_USERNAME = "Tom-Fynes";

// TODO: Update this to your most starred repository name (e.g. "sql-101")
export const FEATURED_REPO = "YOUR_MOST_STARRED_REPO";

export const MAX_REPOS_DISPLAYED = 8;

/** Max repos shown in the commit-chart repo selector dropdown */
export const MAX_REPO_SELECTOR_OPTIONS = 20;

/** X-axis tick interval for the commit activity chart (show 1 tick every N weeks) */
export const COMMIT_CHART_TICK_INTERVAL = 7;

export const WAKATIME_EMBEDS = [
  {
    label: "Coding Activity",
    url: "https://wakatime.com/share/@TomFynes/4c4200f7-738f-4a3a-a39f-be1a6ab5c2b1.svg",
  },
  {
    label: "Languages",
    url: "https://wakatime.com/share/@TomFynes/68a0dc40-cb81-44f2-8c7c-c382195f3a79.svg",
  },
  {
    label: "Editors & OS",
    url: "https://wakatime.com/share/@TomFynes/d201b48c-e6f2-4988-8465-a5e62989cc8b.svg",
  },
];

// ── Sample data (shown when the GitHub API is unavailable) ─────────────────
// These provide a realistic preview of the dashboard so charts are always
// visible — live data replaces this whenever the API responds successfully.

const _weekSec = 7 * 24 * 60 * 60;
const _baseEpoch = Math.floor(Date.now() / 1000) - 52 * _weekSec;

// Fixed 52-week commit pattern (realistic ramp-up over the year)
const _weeklyTotals = [
  1, 3, 2, 4, 5, 3, 1, 2, 4, 6, 3, 5, 4, 2, 6, 7, 4, 3, 5, 8,
  6, 4, 3, 7, 5, 4, 6, 9, 7, 5, 4, 8, 7, 5, 6, 4, 3, 9, 8, 6,
  7, 5, 6, 4, 10, 8, 7, 6, 8, 9, 11, 7,
];

export const DEMO_COMMIT_ACTIVITY = _weeklyTotals.map((total, i) => ({
  week: _baseEpoch + i * _weekSec,
  total,
  days: [
    Math.ceil(total * 0.25),
    Math.ceil(total * 0.2),
    Math.floor(total * 0.2),
    Math.floor(total * 0.2),
    Math.floor(total * 0.15),
    0,
    0,
  ],
}));

export const DEMO_REPOS = [
  {
    id: 1001,
    name: "sql-101",
    full_name: "Tom-Fynes/sql-101",
    description: "SQL 101 — A beginner's guide to SQL",
    stargazers_count: 47,
    forks_count: 14,
    language: "SQL",
    created_at: "2022-01-10T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    html_url: "https://github.com/Tom-Fynes/sql-101",
    topics: ["sql", "tutorial"],
  },
  {
    id: 1002,
    name: "python-101",
    full_name: "Tom-Fynes/python-101",
    description: "Python 101 — Getting started with Python",
    stargazers_count: 31,
    forks_count: 9,
    language: "Python",
    created_at: "2022-09-05T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    html_url: "https://github.com/Tom-Fynes/python-101",
    topics: ["python", "tutorial"],
  },
  {
    id: 1003,
    name: "nebula-nights",
    full_name: "Tom-Fynes/nebula-nights",
    description: "A dark VS Code colour theme",
    stargazers_count: 22,
    forks_count: 3,
    language: "TypeScript",
    created_at: "2023-03-20T00:00:00Z",
    updated_at: "2024-09-01T00:00:00Z",
    html_url: "https://github.com/Tom-Fynes/nebula-nights",
    topics: ["vscode", "theme"],
  },
  {
    id: 1004,
    name: "git-101",
    full_name: "Tom-Fynes/git-101",
    description: "Git 101 — Version control fundamentals",
    stargazers_count: 18,
    forks_count: 5,
    language: "Markdown",
    created_at: "2022-05-15T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
    html_url: "https://github.com/Tom-Fynes/git-101",
    topics: ["git", "tutorial"],
  },
  {
    id: 1005,
    name: "tom-fynes.github.io",
    full_name: "Tom-Fynes/tom-fynes.github.io",
    description: "Personal portfolio and blog built with Docusaurus",
    stargazers_count: 11,
    forks_count: 2,
    language: "TypeScript",
    created_at: "2021-11-01T00:00:00Z",
    updated_at: "2026-03-01T00:00:00Z",
    html_url: "https://github.com/Tom-Fynes/tom-fynes.github.io",
    topics: ["docusaurus", "portfolio"],
  },
  {
    id: 1006,
    name: "data-engineering-toolkit",
    full_name: "Tom-Fynes/data-engineering-toolkit",
    description: "Notebooks and utilities for data engineers",
    stargazers_count: 14,
    forks_count: 4,
    language: "Python",
    created_at: "2023-07-10T00:00:00Z",
    updated_at: "2025-06-01T00:00:00Z",
    html_url: "https://github.com/Tom-Fynes/data-engineering-toolkit",
    topics: ["python", "data-engineering"],
  },
  {
    id: 1007,
    name: "sqlmesh-examples",
    full_name: "Tom-Fynes/sqlmesh-examples",
    description: "Example SQLMesh transformations and pipelines",
    stargazers_count: 9,
    forks_count: 2,
    language: "SQL",
    created_at: "2023-11-20T00:00:00Z",
    updated_at: "2025-11-01T00:00:00Z",
    html_url: "https://github.com/Tom-Fynes/sqlmesh-examples",
    topics: ["sqlmesh", "sql"],
  },
  {
    id: 1008,
    name: "airflow-dags",
    full_name: "Tom-Fynes/airflow-dags",
    description: "Apache Airflow DAG examples for data pipelines",
    stargazers_count: 7,
    forks_count: 1,
    language: "Python",
    created_at: "2024-02-14T00:00:00Z",
    updated_at: "2025-09-01T00:00:00Z",
    html_url: "https://github.com/Tom-Fynes/airflow-dags",
    topics: ["airflow", "python"],
  },
];
