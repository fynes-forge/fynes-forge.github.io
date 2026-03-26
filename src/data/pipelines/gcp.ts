import type { RawNode, RawEdge, PipelineMeta } from "../../components/PipelineViz/PipelineLayout";

const nodes: RawNode[] = [
  // Sources
  {
    id: "cloud-sql",
    data: {
      label: "Cloud SQL",
      subtitle: "Transactional DB",
      icon: "🗃️",
      layer: "source",
      detail: {
        tool: "Google Cloud SQL",
        category: "Managed Relational DB",
        purpose: "Managed PostgreSQL/MySQL instance serving as the operational database for transactional workloads.",
        consideration: "Cloud SQL has connection limits; use Cloud SQL Auth Proxy with connection pooling (pgBouncer) to avoid exhausting connections from Dataflow jobs.",
        docsUrl: "https://cloud.google.com/sql/docs",
      },
    },
  },
  {
    id: "pubsub",
    data: {
      label: "Pub/Sub Topics",
      subtitle: "Event Stream",
      icon: "📡",
      layer: "source",
      detail: {
        tool: "Google Cloud Pub/Sub",
        category: "Message Queue",
        purpose: "Fully managed event ingestion service that decouples producers from consumers in the GCP pipeline.",
        consideration: "Message ordering is not guaranteed across partitions; use ordering keys if downstream processing requires sequenced events.",
        docsUrl: "https://cloud.google.com/pubsub/docs",
      },
    },
  },
  {
    id: "gcs-buckets",
    data: {
      label: "GCS Buckets",
      subtitle: "File Storage",
      icon: "🪣",
      layer: "source",
      detail: {
        tool: "Google Cloud Storage",
        category: "Object Storage",
        purpose: "Landing zone for batch file uploads from external systems, partner feeds, and data exports.",
        consideration: "GCS object change notifications via Pub/Sub can trigger Dataflow jobs automatically — avoid polling-based approaches at scale.",
        docsUrl: "https://cloud.google.com/storage/docs",
      },
    },
  },
  // Ingestion
  {
    id: "datastream",
    data: {
      label: "Datastream CDC",
      subtitle: "Cloud SQL → BigQuery",
      icon: "🔄",
      layer: "ingestion",
      detail: {
        tool: "Google Datastream",
        category: "CDC Service",
        purpose: "Serverless CDC service that continuously replicates Cloud SQL changes directly into BigQuery with low latency.",
        consideration: "Datastream charges per GB processed; monitor replication volume carefully for large OLTP databases with frequent updates.",
        docsUrl: "https://cloud.google.com/datastream/docs",
      },
    },
  },
  {
    id: "pubsub-push",
    data: {
      label: "Pub/Sub Push Sub",
      subtitle: "Event Ingestion",
      icon: "📥",
      layer: "ingestion",
      detail: {
        tool: "Pub/Sub Subscription",
        category: "Event Ingestion",
        purpose: "Push subscription delivers events from Pub/Sub topics directly to Dataflow for real-time stream processing.",
        consideration: "Push subscriptions require an HTTPS endpoint; use pull subscriptions with Dataflow's built-in Pub/Sub IO for better back-pressure control.",
        docsUrl: "https://cloud.google.com/pubsub/docs/subscriber",
      },
    },
  },
  {
    id: "cloud-scheduler",
    data: {
      label: "Cloud Scheduler",
      subtitle: "GCS Trigger",
      icon: "⏰",
      layer: "ingestion",
      detail: {
        tool: "Cloud Scheduler",
        category: "Job Scheduler",
        purpose: "Triggers batch Dataflow jobs on a schedule to process files that have accumulated in GCS buckets.",
        consideration: "Cloud Scheduler has a minimum granularity of 1 minute; for sub-minute triggers, use Pub/Sub notifications with Eventarc instead.",
        docsUrl: "https://cloud.google.com/scheduler/docs",
      },
    },
  },
  // Processing
  {
    id: "dataflow-streaming",
    data: {
      label: "Dataflow Streaming",
      subtitle: "Apache Beam",
      icon: "🌊",
      layer: "transform",
      detail: {
        tool: "Google Dataflow (Streaming)",
        category: "Stream Processing",
        purpose: "Processes Pub/Sub events in real-time using Apache Beam pipelines for filtering, enrichment, and windowed aggregations.",
        consideration: "Dataflow streaming jobs have minimum worker requirements; right-size your pipeline to avoid over-provisioning and unnecessary costs.",
        docsUrl: "https://cloud.google.com/dataflow/docs/guides/streaming-overview",
      },
    },
  },
  {
    id: "dataflow-batch",
    data: {
      label: "Dataflow Batch",
      subtitle: "Apache Beam",
      icon: "📦",
      layer: "transform",
      detail: {
        tool: "Google Dataflow (Batch)",
        category: "Batch Processing",
        purpose: "Processes large GCS file batches with Beam transforms, handling deduplication, validation, and schema normalisation.",
        consideration: "Dataflow batch jobs can experience 'shuffle' bottlenecks on large datasets; use Dataflow Shuffle service to offload shuffle operations.",
        docsUrl: "https://cloud.google.com/dataflow/docs/guides/batch-overview",
      },
    },
  },
  {
    id: "dataproc",
    data: {
      label: "Dataproc Spark",
      subtitle: "Heavy Transforms",
      icon: "⚙️",
      layer: "transform",
      detail: {
        tool: "Google Dataproc",
        category: "Managed Spark",
        purpose: "Runs complex PySpark transformations for heavy data processing that exceeds Dataflow's capabilities.",
        consideration: "Dataproc clusters have startup times of 90+ seconds; use Dataproc Serverless for faster cold-start performance on ephemeral workloads.",
        docsUrl: "https://cloud.google.com/dataproc/docs",
      },
    },
  },
  // Storage
  {
    id: "bq-raw",
    data: {
      label: "BigQuery Raw",
      subtitle: "Raw Dataset",
      icon: "📂",
      layer: "storage",
      detail: {
        tool: "BigQuery",
        category: "Cloud Data Warehouse",
        purpose: "Stores raw, unmodified data from all ingestion sources as the bronze layer of the GCP lakehouse.",
        consideration: "Use table partitioning and clustering on raw tables to reduce query costs; BigQuery charges per byte scanned.",
        docsUrl: "https://cloud.google.com/bigquery/docs",
      },
    },
  },
  {
    id: "bq-curated",
    data: {
      label: "BigQuery Curated",
      subtitle: "Curated Dataset",
      icon: "🗂️",
      layer: "storage",
      detail: {
        tool: "BigQuery",
        category: "Cloud Data Warehouse",
        purpose: "Contains cleaned, validated, and enriched tables built by dbt staging and intermediate models.",
        consideration: "Materialised views in BigQuery can help performance but have refresh latency; choose between views and materialised views based on freshness SLAs.",
        docsUrl: "https://cloud.google.com/bigquery/docs",
      },
    },
  },
  {
    id: "bq-mart",
    data: {
      label: "BigQuery Mart",
      subtitle: "Mart Dataset",
      icon: "🏬",
      layer: "storage",
      detail: {
        tool: "BigQuery",
        category: "Cloud Data Warehouse",
        purpose: "Business-facing data marts built by dbt mart models, optimised for BI tool consumption.",
        consideration: "Row-level access control (RLS) in BigQuery uses row access policies — plan your data governance model before exposing marts to end users.",
        docsUrl: "https://cloud.google.com/bigquery/docs",
      },
    },
  },
  // Transform (dbt)
  {
    id: "dbt-cloud-run",
    data: {
      label: "dbt on Cloud Run",
      subtitle: "SQL Transforms",
      icon: "🔧",
      layer: "transform",
      detail: {
        tool: "dbt Core",
        category: "Transformation Framework",
        purpose: "Runs dbt Core models on Cloud Run to transform raw BigQuery data into curated and mart datasets.",
        consideration: "dbt on Cloud Run requires a containerised invocation pattern; use dbt's --defer flag and state file to only run changed models in CI.",
        docsUrl: "https://docs.getdbt.com/",
      },
    },
  },
  {
    id: "dataplex",
    data: {
      label: "Dataplex",
      subtitle: "Data Quality",
      icon: "✅",
      layer: "transform",
      detail: {
        tool: "Google Dataplex",
        category: "Data Governance",
        purpose: "Applies automated data quality rules and lineage tracking across BigQuery datasets.",
        consideration: "Dataplex quality scans run on a schedule and have a minimum interval of 1 hour; for real-time quality checks, implement BigQuery stored procedure validations.",
        docsUrl: "https://cloud.google.com/dataplex/docs",
      },
    },
  },
  // Orchestration
  {
    id: "cloud-composer",
    data: {
      label: "Cloud Composer",
      subtitle: "Managed Airflow",
      icon: "🌬️",
      layer: "orchestrate",
      detail: {
        tool: "Cloud Composer",
        category: "Orchestration",
        purpose: "Managed Apache Airflow service that orchestrates all GCP pipeline DAGs from ingestion through serving.",
        consideration: "Cloud Composer environments are expensive and have long startup times; use environment variables and Airflow Variables API to manage configuration without redeployment.",
        docsUrl: "https://cloud.google.com/composer/docs",
      },
    },
  },
  // Serving
  {
    id: "bq-analytics",
    data: {
      label: "BigQuery Analytics",
      subtitle: "Analyst Queries",
      icon: "🔍",
      layer: "serving",
      detail: {
        tool: "BigQuery",
        category: "Analytics",
        purpose: "Direct BigQuery access for data analysts to run ad-hoc SQL queries against mart datasets.",
        consideration: "Use slot reservations (BigQuery Editions) instead of on-demand pricing for predictable query workloads with sustained usage.",
        docsUrl: "https://cloud.google.com/bigquery/docs",
      },
    },
  },
  {
    id: "looker",
    data: {
      label: "Looker Studio",
      subtitle: "BI Dashboards",
      icon: "📊",
      layer: "serving",
      detail: {
        tool: "Looker Studio",
        category: "Business Intelligence",
        purpose: "Google's managed BI platform providing drag-and-drop dashboards connected directly to BigQuery.",
        consideration: "Looker Studio caches query results for 12 hours by default; configure custom refresh schedules for dashboards requiring near-real-time data.",
        docsUrl: "https://lookerstudio.google.com/",
      },
    },
  },
  {
    id: "vertex-ai",
    data: {
      label: "Vertex AI",
      subtitle: "ML Platform",
      icon: "🤖",
      layer: "serving",
      detail: {
        tool: "Vertex AI",
        category: "ML Platform",
        purpose: "GCP's unified ML platform consuming BigQuery features for model training, deployment, and inference.",
        consideration: "Vertex AI Feature Store online serving adds significant cost; evaluate whether BigQuery online serving (BQML) meets your latency requirements before adopting Vertex FS.",
        docsUrl: "https://cloud.google.com/vertex-ai/docs",
      },
    },
  },
];

const edges: RawEdge[] = [
  { id: "e-cloudsql-datastream", source: "cloud-sql", target: "datastream", animated: true, type: "smoothstep" },
  { id: "e-pubsub-push", source: "pubsub", target: "pubsub-push", animated: true, type: "smoothstep" },
  { id: "e-gcs-scheduler", source: "gcs-buckets", target: "cloud-scheduler", animated: true, type: "smoothstep" },
  { id: "e-datastream-bqraw", source: "datastream", target: "bq-raw", animated: true, type: "smoothstep" },
  { id: "e-push-dfstream", source: "pubsub-push", target: "dataflow-streaming", animated: true, type: "smoothstep" },
  { id: "e-scheduler-dfbatch", source: "cloud-scheduler", target: "dataflow-batch", animated: true, type: "smoothstep" },
  { id: "e-dfstream-bqraw", source: "dataflow-streaming", target: "bq-raw", animated: true, type: "smoothstep" },
  { id: "e-dfbatch-bqraw", source: "dataflow-batch", target: "bq-raw", animated: true, type: "smoothstep" },
  { id: "e-bqraw-dataproc", source: "bq-raw", target: "dataproc", animated: true, type: "smoothstep" },
  { id: "e-dataproc-bqcurated", source: "dataproc", target: "bq-curated", animated: true, type: "smoothstep" },
  { id: "e-bqraw-dbt", source: "bq-raw", target: "dbt-cloud-run", animated: true, type: "smoothstep" },
  { id: "e-dbt-bqcurated", source: "dbt-cloud-run", target: "bq-curated", animated: true, type: "smoothstep" },
  { id: "e-bqcurated-dataplex", source: "bq-curated", target: "dataplex", animated: true, type: "smoothstep" },
  { id: "e-dataplex-bqmart", source: "dataplex", target: "bq-mart", animated: true, type: "smoothstep" },
  { id: "e-dbt-bqmart", source: "dbt-cloud-run", target: "bq-mart", animated: true, type: "smoothstep" },
  { id: "e-composer-dbt", source: "cloud-composer", target: "dbt-cloud-run", animated: false, type: "smoothstep" },
  { id: "e-composer-dataproc", source: "cloud-composer", target: "dataproc", animated: false, type: "smoothstep" },
  { id: "e-bqmart-analytics", source: "bq-mart", target: "bq-analytics", animated: true, type: "smoothstep" },
  { id: "e-bqmart-looker", source: "bq-mart", target: "looker", animated: true, type: "smoothstep" },
  { id: "e-bqcurated-vertex", source: "bq-curated", target: "vertex-ai", animated: true, type: "smoothstep" },
];

const gcpMeta: PipelineMeta = {
  title: "GCP Native Pipeline",
  description:
    "A fully managed GCP-native pipeline leveraging Pub/Sub for event ingestion, Dataflow for stream and batch processing, and BigQuery as the central warehouse.",
  route: "/pipelines/gcp",
  nodes,
  edges,
};

export default gcpMeta;
