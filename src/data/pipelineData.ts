// Pipeline data: all nodes, edges, and detail panel content
// Edit this file to update the pipeline visualizer

export type LayerType = "source" | "ingestion" | "storage" | "serving";

export interface NodeDetail {
  tool: string;
  purpose: string;
  consideration: string;
}

export interface PipelineNodeData {
  label: string;
  subtitle: string;
  icon: string;
  layer: LayerType;
  detail: NodeDetail;
}

export interface PipelineEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  type?: string;
}

// Layer color tokens (mapped to Tailwind / CSS variables at render time)
export const LAYER_COLORS: Record<LayerType, string> = {
  source: "#3B82F6",    // blue-500
  ingestion: "#F97316", // orange-500
  storage: "#A855F7",   // purple-500
  serving: "#22C55E",   // green-500
};

export const LAYER_BG: Record<LayerType, string> = {
  source: "#EFF6FF",    // blue-50
  ingestion: "#FFF7ED", // orange-50
  storage: "#FAF5FF",   // purple-50
  serving: "#F0FDF4",   // green-50
};

export const LAYER_BG_DARK: Record<LayerType, string> = {
  source: "#1e3a5f",
  ingestion: "#4a2510",
  storage: "#3b1f5e",
  serving: "#14401e",
};

// ------------------------------------------------------------------
// Nodes
// ------------------------------------------------------------------
export const pipelineNodes: Array<{ id: string; data: PipelineNodeData; position: { x: number; y: number } }> = [
  // ---- Sources ----
  {
    id: "postgres",
    position: { x: 0, y: 0 },
    data: {
      label: "PostgreSQL",
      subtitle: "Transactional DB",
      icon: "🐘",
      layer: "source",
      detail: {
        tool: "PostgreSQL",
        purpose: "OLTP database storing operational records — orders, users, events.",
        consideration: "High-frequency writes mean CDC must be carefully tuned to avoid replication lag impacting the production workload.",
      },
    },
  },
  {
    id: "kafka-topics",
    position: { x: 0, y: 0 },
    data: {
      label: "Kafka Topics",
      subtitle: "Event stream",
      icon: "📨",
      layer: "source",
      detail: {
        tool: "Apache Kafka",
        purpose: "Durable, high-throughput event bus for real-time data streams.",
        consideration: "Partition count and retention period must be sized up front — changing them in production is disruptive.",
      },
    },
  },
  {
    id: "s3-raw",
    position: { x: 0, y: 0 },
    data: {
      label: "S3 Raw Files",
      subtitle: "Batch uploads",
      icon: "🪣",
      layer: "source",
      detail: {
        tool: "Amazon S3",
        purpose: "Landing zone for bulk file uploads (CSV, JSON, Parquet) from third-party feeds.",
        consideration: "S3 eventual consistency can cause 'file not found' errors in downstream jobs; use S3 Event Notifications or object-level checksums.",
      },
    },
  },

  // ---- Ingestion ----
  {
    id: "debezium",
    position: { x: 0, y: 0 },
    data: {
      label: "Debezium CDC",
      subtitle: "Change Data Capture",
      icon: "🔄",
      layer: "ingestion",
      detail: {
        tool: "Debezium",
        purpose: "Streams row-level changes from PostgreSQL WAL into Kafka topics with zero-impact on the source.",
        consideration: "Schema evolution (DDL changes) can break the connector; use Confluent Schema Registry with AVRO for safe forward compatibility.",
      },
    },
  },
  {
    id: "kafka-connect",
    position: { x: 0, y: 0 },
    data: {
      label: "Kafka Connect",
      subtitle: "Stream sink",
      icon: "🔌",
      layer: "ingestion",
      detail: {
        tool: "Kafka Connect",
        purpose: "Moves data from Kafka topics into the Bronze storage layer using a managed sink connector.",
        consideration: "Back-pressure between source throughput and sink capacity can cause consumer-group lag; monitor with `kafka.consumer.lag` metric.",
      },
    },
  },
  {
    id: "glue-crawler",
    position: { x: 0, y: 0 },
    data: {
      label: "AWS Glue Crawler",
      subtitle: "Schema discovery",
      icon: "🕷️",
      layer: "ingestion",
      detail: {
        tool: "AWS Glue Crawler",
        purpose: "Automatically infers schema from S3 raw files and populates the Glue Data Catalog.",
        consideration: "Crawlers can misclassify data types in mixed-format files; validate inferred schemas before they propagate downstream.",
      },
    },
  },

  // ---- Storage layers ----
  {
    id: "bronze",
    position: { x: 0, y: 0 },
    data: {
      label: "Bronze Layer",
      subtitle: "Raw / landing zone",
      icon: "🥉",
      layer: "storage",
      detail: {
        tool: "Delta Lake / Iceberg — Bronze",
        purpose: "Immutable, append-only store of raw data exactly as received — the single source of truth for re-processing.",
        consideration: "Storage costs compound quickly; implement lifecycle policies (e.g. S3 Intelligent-Tiering) and vacuum/compaction jobs.",
      },
    },
  },
  {
    id: "silver",
    position: { x: 0, y: 0 },
    data: {
      label: "Silver Layer",
      subtitle: "Cleaned + validated",
      icon: "🥈",
      layer: "storage",
      detail: {
        tool: "Delta Lake / Iceberg — Silver",
        purpose: "Deduped, type-cast, and schema-validated data ready for analytical joins.",
        consideration: "Define clear SLAs for Silver freshness; late-arriving data from CDC may require watermark-based deduplication logic.",
      },
    },
  },
  {
    id: "gold",
    position: { x: 0, y: 0 },
    data: {
      label: "Gold Layer",
      subtitle: "Aggregated + business-ready",
      icon: "🥇",
      layer: "storage",
      detail: {
        tool: "Delta Lake / Iceberg — Gold",
        purpose: "Curated, denormalised fact and dimension tables built for fast BI and ML consumption.",
        consideration: "Gold models are expensive to recompute; use incremental materialisation strategies (e.g. dbt incremental models) rather than full refreshes.",
      },
    },
  },

  // ---- Serving ----
  {
    id: "bi-dashboard",
    position: { x: 0, y: 0 },
    data: {
      label: "BI Dashboard",
      subtitle: "Tableau / Metabase",
      icon: "📊",
      layer: "serving",
      detail: {
        tool: "Tableau / Metabase",
        purpose: "Self-service analytics dashboards allowing business stakeholders to explore Gold-layer data.",
        consideration: "Live queries against large Delta tables can be slow; pre-materialise aggregations or use a columnar cache layer (e.g. Apache Pinot).",
      },
    },
  },
  {
    id: "ml-feature-store",
    position: { x: 0, y: 0 },
    data: {
      label: "ML Feature Store",
      subtitle: "Feature engineering",
      icon: "🤖",
      layer: "serving",
      detail: {
        tool: "Feast / Tecton / SageMaker Feature Store",
        purpose: "Centralised store of reusable, versioned features that eliminates training–serving skew.",
        consideration: "Online store latency (<10 ms p99) is critical for real-time inference; benchmark your retrieval path before going to production.",
      },
    },
  },
  {
    id: "rest-api",
    position: { x: 0, y: 0 },
    data: {
      label: "REST API",
      subtitle: "Data products",
      icon: "🌐",
      layer: "serving",
      detail: {
        tool: "FastAPI / AWS API Gateway",
        purpose: "Exposes curated datasets as versioned REST endpoints for internal and external consumers.",
        consideration: "Rate limiting and pagination are non-negotiable in production; poorly guarded endpoints can inadvertently expose PII.",
      },
    },
  },
];

// ------------------------------------------------------------------
// Edges
// ------------------------------------------------------------------
export const pipelineEdges: PipelineEdge[] = [
  // Sources → Ingestion
  { id: "e-postgres-debezium", source: "postgres", target: "debezium", animated: true, type: "smoothstep" },
  { id: "e-kafka-connect", source: "kafka-topics", target: "kafka-connect", animated: true, type: "smoothstep" },
  { id: "e-s3-glue", source: "s3-raw", target: "glue-crawler", animated: true, type: "smoothstep" },

  // Ingestion → Bronze
  { id: "e-debezium-bronze", source: "debezium", target: "bronze", animated: true, type: "smoothstep" },
  { id: "e-connect-bronze", source: "kafka-connect", target: "bronze", animated: true, type: "smoothstep" },
  { id: "e-glue-bronze", source: "glue-crawler", target: "bronze", animated: true, type: "smoothstep" },

  // Bronze → Silver → Gold
  { id: "e-bronze-silver", source: "bronze", target: "silver", animated: true, type: "smoothstep" },
  { id: "e-silver-gold", source: "silver", target: "gold", animated: true, type: "smoothstep" },

  // Gold → Serving
  { id: "e-gold-bi", source: "gold", target: "bi-dashboard", animated: true, type: "smoothstep" },
  { id: "e-gold-ml", source: "gold", target: "ml-feature-store", animated: true, type: "smoothstep" },
  { id: "e-gold-api", source: "gold", target: "rest-api", animated: true, type: "smoothstep" },
];
