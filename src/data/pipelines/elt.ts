import type { RawNode, RawEdge, PipelineMeta } from "../../components/PipelineViz/PipelineLayout";

const nodes: RawNode[] = [
  // Sources
  {
    id: "salesforce",
    data: {
      label: "Salesforce",
      subtitle: "CRM",
      icon: "☁️",
      layer: "source",
      detail: {
        tool: "Salesforce",
        category: "CRM",
        purpose: "Source of customer, opportunity, and sales activity data replicated into Snowflake via Fivetran.",
        consideration: "Salesforce API rate limits (concurrent API calls) can throttle Fivetran syncs during peak hours; schedule syncs during off-peak windows.",
        docsUrl: "https://developer.salesforce.com/docs/",
      },
    },
  },
  {
    id: "stripe",
    data: {
      label: "Stripe",
      subtitle: "Payments",
      icon: "💳",
      layer: "source",
      detail: {
        tool: "Stripe",
        category: "Payments Platform",
        purpose: "Payment events and subscription data replicated into Snowflake for financial reporting and revenue analytics.",
        consideration: "Stripe's event-based API means historical backfills are expensive; plan your initial sync window carefully to avoid hitting rate limits.",
        docsUrl: "https://stripe.com/docs/api",
      },
    },
  },
  {
    id: "hubspot",
    data: {
      label: "HubSpot",
      subtitle: "Marketing",
      icon: "🎯",
      layer: "source",
      detail: {
        tool: "HubSpot",
        category: "Marketing Automation",
        purpose: "Marketing campaign, email engagement, and lead attribution data used in pipeline attribution models.",
        consideration: "HubSpot's contact deduplication logic differs from Salesforce; implement a master customer ID resolution layer in dbt staging models.",
        docsUrl: "https://developers.hubspot.com/docs/api/overview",
      },
    },
  },
  {
    id: "google-ads",
    data: {
      label: "Google Ads",
      subtitle: "Ad Spend",
      icon: "📢",
      layer: "source",
      detail: {
        tool: "Google Ads",
        category: "Advertising Platform",
        purpose: "Campaign performance and ad spend data used in marketing ROI and attribution models.",
        consideration: "Google Ads data has a 3-hour delay for conversion data; design your attribution models to account for late-arriving conversion events.",
        docsUrl: "https://developers.google.com/google-ads/api/docs/start",
      },
    },
  },
  {
    id: "postgres-app",
    data: {
      label: "PostgreSQL App DB",
      subtitle: "Application Database",
      icon: "🐘",
      layer: "source",
      detail: {
        tool: "PostgreSQL",
        category: "Application Database",
        purpose: "Operational application database containing user accounts, product data, and transactional records.",
        consideration: "Fivetran uses logical replication for Postgres; ensure wal_level=logical and adequate replication slot retention to prevent WAL accumulation.",
        docsUrl: "https://fivetran.com/docs/databases/postgresql",
      },
    },
  },
  // Ingestion
  {
    id: "fivetran",
    data: {
      label: "Fivetran Connectors",
      subtitle: "Zero-code ELT",
      icon: "🔗",
      layer: "ingestion",
      detail: {
        tool: "Fivetran",
        category: "Managed ELT",
        purpose: "Managed, zero-code connectors that handle schema evolution, incremental syncs, and data type mapping for all source systems.",
        consideration: "Fivetran pricing is based on Monthly Active Rows (MAR); audit your connector sync frequency and disable high-volume tables that aren't needed.",
        docsUrl: "https://fivetran.com/docs",
      },
    },
  },
  {
    id: "snowflake-landing",
    data: {
      label: "Snowflake Landing",
      subtitle: "Raw Schema",
      icon: "❄️",
      layer: "ingestion",
      detail: {
        tool: "Snowflake",
        category: "Data Warehouse",
        purpose: "Fivetran-managed schemas in Snowflake containing raw, source-named tables exactly as extracted from source systems.",
        consideration: "Fivetran creates and manages these schemas automatically; avoid manually altering Fivetran-managed tables as this can break sync state.",
        docsUrl: "https://docs.snowflake.com/",
      },
    },
  },
  // Storage
  {
    id: "sf-raw",
    data: {
      label: "Snowflake Raw",
      subtitle: "Source-named Schemas",
      icon: "📂",
      layer: "storage",
      detail: {
        tool: "Snowflake",
        category: "Data Warehouse",
        purpose: "Immutable raw layer preserving source data exactly as landed, organised by source system schema.",
        consideration: "Use Snowflake's Time Travel and Fail-safe features for the raw layer; 90-day Time Travel on raw tables provides a reliable audit trail.",
        docsUrl: "https://docs.snowflake.com/",
      },
    },
  },
  {
    id: "sf-staging",
    data: {
      label: "Snowflake Staging",
      subtitle: "dbt Staging Models",
      icon: "🗂️",
      layer: "storage",
      detail: {
        tool: "Snowflake",
        category: "Data Warehouse",
        purpose: "dbt staging models that apply light transformations: renaming, type casting, and deduplication close to the source.",
        consideration: "Staging models should be 1:1 with sources; avoid complex joins or business logic in staging — that belongs in intermediate models.",
        docsUrl: "https://docs.getdbt.com/guides/best-practices/how-we-structure-our-dbt-projects",
      },
    },
  },
  {
    id: "sf-marts",
    data: {
      label: "Snowflake Marts",
      subtitle: "dbt Mart Models",
      icon: "🏬",
      layer: "storage",
      detail: {
        tool: "Snowflake",
        category: "Data Warehouse",
        purpose: "Wide, business-facing tables combining staging data into fact and dimension tables organised by business domain.",
        consideration: "Snowflake clustering keys on large mart tables can dramatically reduce query latency; choose clustering keys aligned to your most common filter patterns.",
        docsUrl: "https://docs.snowflake.com/",
      },
    },
  },
  // Transform
  {
    id: "dbt-staging",
    data: {
      label: "dbt Staging",
      subtitle: "Staging Models",
      icon: "🔧",
      layer: "transform",
      detail: {
        tool: "dbt Core",
        category: "Transformation",
        purpose: "Thin staging models that rename columns, cast types, and deduplicate records for each source system.",
        consideration: "Use dbt sources with freshness checks to automatically fail pipelines if source data hasn't arrived within the expected window.",
        docsUrl: "https://docs.getdbt.com/docs/build/sources",
      },
    },
  },
  {
    id: "dbt-intermediate",
    data: {
      label: "dbt Intermediate",
      subtitle: "Intermediate Models",
      icon: "🔨",
      layer: "transform",
      detail: {
        tool: "dbt Core",
        category: "Transformation",
        purpose: "Intermediate models join and aggregate staging data, resolving entity relationships and applying business logic.",
        consideration: "Intermediate models are ephemeral by default in dbt best practices; materialise as views unless query performance requires table materialisation.",
        docsUrl: "https://docs.getdbt.com/guides/best-practices/how-we-structure-our-dbt-projects",
      },
    },
  },
  {
    id: "dbt-marts",
    data: {
      label: "dbt Mart Models",
      subtitle: "Mart Models",
      icon: "🏗️",
      layer: "transform",
      detail: {
        tool: "dbt Core",
        category: "Transformation",
        purpose: "Final mart models producing wide fact and dimension tables for BI tools and analysts.",
        consideration: "Use dbt's incremental materialisation strategy for large fact tables; ensure your unique key strategy handles late-arriving and out-of-order records.",
        docsUrl: "https://docs.getdbt.com/docs/build/incremental-models",
      },
    },
  },
  {
    id: "dbt-tests",
    data: {
      label: "dbt Tests",
      subtitle: "Schema + Data Tests",
      icon: "✅",
      layer: "transform",
      detail: {
        tool: "dbt Tests",
        category: "Data Quality",
        purpose: "Schema tests (not_null, unique, accepted_values, relationships) and custom data tests validate pipeline integrity.",
        consideration: "Store test results in Snowflake using dbt's store_failures configuration; this creates a queryable audit trail of data quality failures over time.",
        docsUrl: "https://docs.getdbt.com/docs/build/data-tests",
      },
    },
  },
  // Orchestration
  {
    id: "dbt-cloud",
    data: {
      label: "dbt Cloud Jobs",
      subtitle: "Scheduled Runs",
      icon: "☁️",
      layer: "orchestrate",
      detail: {
        tool: "dbt Cloud",
        category: "Orchestration",
        purpose: "dbt Cloud manages job scheduling, CI/CD for dbt models, and provides a UI for job monitoring and alerting.",
        consideration: "dbt Cloud's IDE and job scheduler are convenient but expensive; evaluate dbt Core with Airflow/Prefect if you need more orchestration flexibility.",
        docsUrl: "https://docs.getdbt.com/docs/deploy/dbt-cloud-job",
      },
    },
  },
  // Serving
  {
    id: "snowflake-analyst",
    data: {
      label: "Snowflake Queries",
      subtitle: "Analyst Queries",
      icon: "🔍",
      layer: "serving",
      detail: {
        tool: "Snowflake",
        category: "Analytics",
        purpose: "Data analysts run SQL directly against Snowflake mart tables for ad-hoc analysis and report generation.",
        consideration: "Use Snowflake resource monitors to cap credit consumption per warehouse and prevent runaway queries from impacting budgets.",
        docsUrl: "https://docs.snowflake.com/",
      },
    },
  },
  {
    id: "tableau",
    data: {
      label: "Tableau / Looker",
      subtitle: "BI Dashboards",
      icon: "📊",
      layer: "serving",
      detail: {
        tool: "Tableau / Looker",
        category: "Business Intelligence",
        purpose: "Enterprise BI tools connected to Snowflake marts for executive dashboards and self-service analytics.",
        consideration: "Live Tableau connections to Snowflake can be expensive; use Tableau's extract refresh jobs to cache data and reduce warehouse compute.",
        docsUrl: "https://help.tableau.com/current/pro/desktop/en-us/snowflake_connectpro.htm",
      },
    },
  },
  {
    id: "reverse-etl",
    data: {
      label: "Reverse ETL",
      subtitle: "Census → Salesforce",
      icon: "🔁",
      layer: "serving",
      detail: {
        tool: "Census",
        category: "Reverse ETL",
        purpose: "Syncs dbt-transformed Snowflake data back into Salesforce and other operational tools to power sales and marketing workflows.",
        consideration: "Reverse ETL creates a feedback loop into source systems; implement strict field-level access controls to prevent circular updates corrupting source data.",
        docsUrl: "https://docs.getcensus.com/",
      },
    },
  },
];

const edges: RawEdge[] = [
  { id: "e-sf-fivetran", source: "salesforce", target: "fivetran", animated: true, type: "smoothstep" },
  { id: "e-stripe-fivetran", source: "stripe", target: "fivetran", animated: true, type: "smoothstep" },
  { id: "e-hub-fivetran", source: "hubspot", target: "fivetran", animated: true, type: "smoothstep" },
  { id: "e-gads-fivetran", source: "google-ads", target: "fivetran", animated: true, type: "smoothstep" },
  { id: "e-pg-fivetran", source: "postgres-app", target: "fivetran", animated: true, type: "smoothstep" },
  { id: "e-fivetran-landing", source: "fivetran", target: "snowflake-landing", animated: true, type: "smoothstep" },
  { id: "e-landing-sfraw", source: "snowflake-landing", target: "sf-raw", animated: true, type: "smoothstep" },
  { id: "e-sfraw-dbtstaging", source: "sf-raw", target: "dbt-staging", animated: true, type: "smoothstep" },
  { id: "e-dbtstaging-sfstaging", source: "dbt-staging", target: "sf-staging", animated: true, type: "smoothstep" },
  { id: "e-sfstaging-dbtint", source: "sf-staging", target: "dbt-intermediate", animated: true, type: "smoothstep" },
  { id: "e-dbtint-dbtmart", source: "dbt-intermediate", target: "dbt-marts", animated: true, type: "smoothstep" },
  { id: "e-dbtmart-sfmart", source: "dbt-marts", target: "sf-marts", animated: true, type: "smoothstep" },
  { id: "e-sfstaging-dbttests", source: "sf-staging", target: "dbt-tests", animated: true, type: "smoothstep" },
  { id: "e-sfmart-dbttests", source: "sf-marts", target: "dbt-tests", animated: true, type: "smoothstep" },
  { id: "e-cloud-dbtstaging", source: "dbt-cloud", target: "dbt-staging", animated: false, type: "smoothstep" },
  { id: "e-cloud-dbtint", source: "dbt-cloud", target: "dbt-intermediate", animated: false, type: "smoothstep" },
  { id: "e-cloud-dbtmart", source: "dbt-cloud", target: "dbt-marts", animated: false, type: "smoothstep" },
  { id: "e-sfmart-analyst", source: "sf-marts", target: "snowflake-analyst", animated: true, type: "smoothstep" },
  { id: "e-sfmart-tableau", source: "sf-marts", target: "tableau", animated: true, type: "smoothstep" },
  { id: "e-sfmart-retl", source: "sf-marts", target: "reverse-etl", animated: true, type: "smoothstep" },
  { id: "e-retl-sf", source: "reverse-etl", target: "salesforce", animated: true, type: "smoothstep" },
];

const eltMeta: PipelineMeta = {
  title: "ELT Pipeline",
  description:
    "A SaaS-first ELT pattern using Fivetran for zero-code ingestion, Snowflake as the cloud data warehouse, and dbt for modular, tested transformations.",
  route: "/pipelines/elt",
  nodes,
  edges,
};

export default eltMeta;
