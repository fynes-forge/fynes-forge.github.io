import type { RawNode, RawEdge, PipelineMeta } from "../../components/PipelineViz/PipelineLayout";

const nodes: RawNode[] = [
  // Sources
  {
    id: "pg-source",
    data: {
      label: "PostgreSQL",
      subtitle: "Operational DB",
      icon: "🐘",
      layer: "source",
      detail: {
        tool: "PostgreSQL",
        category: "Relational Database",
        purpose: "OLTP database storing operational records — orders, users, and events that flow into the lakehouse.",
        consideration: "High-frequency writes mean CDC must be carefully tuned to avoid replication lag impacting the production workload.",
        docsUrl: "https://www.postgresql.org/docs/",
      },
    },
  },
  {
    id: "kafka-source",
    data: {
      label: "Kafka Topics",
      subtitle: "Event Stream",
      icon: "📨",
      layer: "source",
      detail: {
        tool: "Apache Kafka",
        category: "Message Queue",
        purpose: "Durable, high-throughput event bus for real-time data streams feeding the lakehouse ingestion layer.",
        consideration: "Partition count and retention period must be sized up front — changing them in production is disruptive.",
        docsUrl: "https://kafka.apache.org/documentation/",
      },
    },
  },
  {
    id: "s3-source",
    data: {
      label: "S3 Raw Files",
      subtitle: "Batch Upload",
      icon: "🪣",
      layer: "source",
      detail: {
        tool: "Amazon S3",
        category: "Object Storage",
        purpose: "Landing zone for bulk file uploads (CSV, JSON, Parquet) from third-party feeds.",
        consideration: "S3 eventual consistency can cause 'file not found' errors in downstream jobs; use S3 Event Notifications or object-level checksums.",
        docsUrl: "https://docs.aws.amazon.com/s3/",
      },
    },
  },
  // Ingestion
  {
    id: "debezium",
    data: {
      label: "Debezium CDC",
      subtitle: "Change Data Capture",
      icon: "🔄",
      layer: "ingestion",
      detail: {
        tool: "Debezium",
        category: "CDC Connector",
        purpose: "Streams row-level changes from PostgreSQL WAL into Kafka topics with zero impact on the source.",
        consideration: "Schema evolution (DDL changes) can break the connector; use Confluent Schema Registry with Avro for safe forward compatibility.",
        docsUrl: "https://debezium.io/documentation/",
      },
    },
  },
  {
    id: "kafka-connect",
    data: {
      label: "Kafka Connect",
      subtitle: "Stream Sink",
      icon: "🔌",
      layer: "ingestion",
      detail: {
        tool: "Kafka Connect",
        category: "Data Integration",
        purpose: "Moves data from Kafka topics into the Bronze Iceberg storage layer using a managed sink connector.",
        consideration: "Back-pressure between source throughput and sink capacity can cause consumer-group lag; monitor the kafka.consumer.lag metric.",
        docsUrl: "https://docs.confluent.io/platform/current/connect/index.html",
      },
    },
  },
  {
    id: "glue-crawler",
    data: {
      label: "AWS Glue Crawler",
      subtitle: "Schema Discovery",
      icon: "🕷️",
      layer: "ingestion",
      detail: {
        tool: "AWS Glue Crawler",
        category: "Schema Discovery",
        purpose: "Automatically infers schema from S3 raw files and populates the Glue Data Catalog for downstream consumption.",
        consideration: "Crawlers can misclassify data types in mixed-format files; validate inferred schemas before they propagate downstream.",
        docsUrl: "https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html",
      },
    },
  },
  // Storage
  {
    id: "bronze",
    data: {
      label: "Bronze Layer",
      subtitle: "S3 + Iceberg (Raw)",
      icon: "🥉",
      layer: "storage",
      detail: {
        tool: "Apache Iceberg — Bronze",
        category: "Table Format",
        purpose: "Immutable, append-only store of raw data exactly as received — the single source of truth for re-processing.",
        consideration: "Storage costs compound quickly; implement lifecycle policies (S3 Intelligent-Tiering) and regular vacuum/compaction jobs.",
        docsUrl: "https://iceberg.apache.org/docs/latest/",
      },
    },
  },
  {
    id: "silver",
    data: {
      label: "Silver Layer",
      subtitle: "S3 + Iceberg (Cleaned)",
      icon: "🥈",
      layer: "storage",
      detail: {
        tool: "Apache Iceberg — Silver",
        category: "Table Format",
        purpose: "Deduped, type-cast, and schema-validated data ready for analytical joins and downstream models.",
        consideration: "Define clear SLAs for Silver freshness; late-arriving data from CDC may require watermark-based deduplication logic.",
        docsUrl: "https://iceberg.apache.org/docs/latest/",
      },
    },
  },
  {
    id: "gold",
    data: {
      label: "Gold Layer",
      subtitle: "S3 + Iceberg (Aggregated)",
      icon: "🥇",
      layer: "storage",
      detail: {
        tool: "Apache Iceberg — Gold",
        category: "Table Format",
        purpose: "Curated, denormalised fact and dimension tables built for fast BI and ML consumption.",
        consideration: "Gold models are expensive to recompute; use incremental materialisation strategies (dbt incremental) rather than full refreshes.",
        docsUrl: "https://iceberg.apache.org/docs/latest/",
      },
    },
  },
  // Transform
  {
    id: "sqlmesh",
    data: {
      label: "SQLMesh",
      subtitle: "Incremental Models",
      icon: "🔧",
      layer: "transform",
      detail: {
        tool: "SQLMesh",
        category: "Transformation Framework",
        purpose: "Manages incremental transformation models and data contracts with automatic change detection.",
        consideration: "SQLMesh's virtual environments are powerful but require a learning curve; invest time in understanding model kinds before adopting at scale.",
        docsUrl: "https://sqlmesh.readthedocs.io/",
      },
    },
  },
  {
    id: "great-expectations",
    data: {
      label: "Great Expectations",
      subtitle: "Data Quality",
      icon: "✅",
      layer: "transform",
      detail: {
        tool: "Great Expectations",
        category: "Data Quality",
        purpose: "Validates data against expectations between Silver and Gold layers to prevent bad data from reaching analysts.",
        consideration: "Expectation suites can become stale as the business evolves; treat them like tests — review and update on schema changes.",
        docsUrl: "https://docs.greatexpectations.io/",
      },
    },
  },
  // Orchestration
  {
    id: "airflow",
    data: {
      label: "Apache Airflow",
      subtitle: "Workflow Orchestration",
      icon: "🌬️",
      layer: "orchestrate",
      detail: {
        tool: "Apache Airflow",
        category: "Orchestration",
        purpose: "Schedules and monitors all pipeline DAGs including ingestion, transformation, and data quality checks.",
        consideration: "Airflow's scheduler can become a bottleneck at scale; consider using the CeleryExecutor or KubernetesExecutor with task-level isolation.",
        docsUrl: "https://airflow.apache.org/docs/",
      },
    },
  },
  // Serving
  {
    id: "trino",
    data: {
      label: "Trino",
      subtitle: "Ad-hoc Query",
      icon: "⚡",
      layer: "serving",
      detail: {
        tool: "Trino",
        category: "Query Engine",
        purpose: "Federated SQL query engine that reads directly from Iceberg tables in S3 without data movement.",
        consideration: "Query performance is heavily dependent on table statistics; run ANALYZE regularly and use Iceberg partitioning strategies aligned to query patterns.",
        docsUrl: "https://trino.io/docs/current/",
      },
    },
  },
  {
    id: "metabase",
    data: {
      label: "BI Dashboard",
      subtitle: "Metabase",
      icon: "📊",
      layer: "serving",
      detail: {
        tool: "Metabase",
        category: "Business Intelligence",
        purpose: "Self-service analytics dashboards allowing business stakeholders to explore Gold-layer data via Trino.",
        consideration: "Live queries against large Iceberg tables can be slow; pre-materialise aggregations or use a columnar cache layer.",
        docsUrl: "https://www.metabase.com/docs/",
      },
    },
  },
  {
    id: "feature-store",
    data: {
      label: "ML Feature Store",
      subtitle: "Feature Engineering",
      icon: "🤖",
      layer: "serving",
      detail: {
        tool: "Feast / Tecton",
        category: "ML Infrastructure",
        purpose: "Centralised store of reusable, versioned features that eliminates training–serving skew.",
        consideration: "Online store latency (<10 ms p99) is critical for real-time inference; benchmark your retrieval path before going to production.",
        docsUrl: "https://docs.feast.dev/",
      },
    },
  },
];

const edges: RawEdge[] = [
  { id: "e-pg-debezium", source: "pg-source", target: "debezium", animated: true, type: "smoothstep" },
  { id: "e-kafka-connect", source: "kafka-source", target: "kafka-connect", animated: true, type: "smoothstep" },
  { id: "e-s3-glue", source: "s3-source", target: "glue-crawler", animated: true, type: "smoothstep" },
  { id: "e-debezium-bronze", source: "debezium", target: "bronze", animated: true, type: "smoothstep" },
  { id: "e-connect-bronze", source: "kafka-connect", target: "bronze", animated: true, type: "smoothstep" },
  { id: "e-glue-bronze", source: "glue-crawler", target: "bronze", animated: true, type: "smoothstep" },
  { id: "e-bronze-silver", source: "bronze", target: "silver", animated: true, type: "smoothstep" },
  { id: "e-silver-ge", source: "silver", target: "great-expectations", animated: true, type: "smoothstep" },
  { id: "e-ge-gold", source: "great-expectations", target: "gold", animated: true, type: "smoothstep" },
  { id: "e-bronze-sqlmesh", source: "bronze", target: "sqlmesh", animated: true, type: "smoothstep" },
  { id: "e-sqlmesh-silver", source: "sqlmesh", target: "silver", animated: true, type: "smoothstep" },
  { id: "e-airflow-sqlmesh", source: "airflow", target: "sqlmesh", animated: false, type: "smoothstep" },
  { id: "e-airflow-ge", source: "airflow", target: "great-expectations", animated: false, type: "smoothstep" },
  { id: "e-gold-trino", source: "gold", target: "trino", animated: true, type: "smoothstep" },
  { id: "e-trino-metabase", source: "trino", target: "metabase", animated: true, type: "smoothstep" },
  { id: "e-gold-feature", source: "gold", target: "feature-store", animated: true, type: "smoothstep" },
];

const lakehouseMeta: PipelineMeta = {
  title: "Lakehouse Architecture",
  description:
    "A modern open lakehouse using Trino as the query engine, Apache Iceberg for table format, and SQLMesh for transformation and data contract management.",
  route: "/pipelines/lakehouse",
  nodes,
  edges,
};

export default lakehouseMeta;
