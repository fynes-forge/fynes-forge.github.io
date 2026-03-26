import type { RawNode, RawEdge, PipelineMeta } from "../../components/PipelineViz/PipelineLayout";

const nodes: RawNode[] = [
  // Sources
  {
    id: "microservice-events",
    data: {
      label: "Microservice Events",
      subtitle: "Application Events",
      icon: "⚙️",
      layer: "source",
      detail: {
        tool: "Microservices",
        category: "Event Source",
        purpose: "Backend services emit domain events (order created, payment processed) that drive real-time analytics and alerting.",
        consideration: "Event schema governance is critical at source; any breaking change must be backward-compatible or coordinated across all consumer teams.",
        docsUrl: "https://microservices.io/patterns/data/event-sourcing.html",
      },
    },
  },
  {
    id: "iot-sensors",
    data: {
      label: "IoT Sensors",
      subtitle: "Device Telemetry",
      icon: "📡",
      layer: "source",
      detail: {
        tool: "IoT Devices",
        category: "Telemetry Source",
        purpose: "Sensors emit high-frequency telemetry data (temperature, vibration, GPS) that requires real-time anomaly detection.",
        consideration: "IoT devices often have unreliable connectivity; implement client-side buffering and at-least-once delivery semantics with idempotent consumers.",
        docsUrl: "https://kafka.apache.org/documentation/#connect",
      },
    },
  },
  {
    id: "clickstream",
    data: {
      label: "Clickstream",
      subtitle: "Web / App Events",
      icon: "🖱️",
      layer: "source",
      detail: {
        tool: "Web Analytics SDK",
        category: "Behavioural Data",
        purpose: "Captures user interaction events from web and mobile apps for real-time personalisation and funnel analysis.",
        consideration: "Clickstream data volumes spike unpredictably during campaigns or viral events; ensure your Kafka cluster can handle 10x normal peak load.",
        docsUrl: "https://snowplow.io/docs/",
      },
    },
  },
  // Ingestion
  {
    id: "kafka-producers",
    data: {
      label: "Kafka Producers",
      subtitle: "Event Publishing",
      icon: "📤",
      layer: "ingestion",
      detail: {
        tool: "Kafka Producers",
        category: "Event Publishing",
        purpose: "Client libraries that serialize and publish events to Kafka topics with configurable batching and compression.",
        consideration: "Producer acks=all with min.insync.replicas=2 ensures durability but adds latency; tune acks and linger.ms based on your durability vs. throughput trade-off.",
        docsUrl: "https://kafka.apache.org/documentation/#producerconfigs",
      },
    },
  },
  {
    id: "kafka-topics-main",
    data: {
      label: "Kafka Topics",
      subtitle: "Partitioned Streams",
      icon: "📨",
      layer: "ingestion",
      detail: {
        tool: "Apache Kafka",
        category: "Event Backbone",
        purpose: "Partitioned, replicated event log providing durable, ordered streams with configurable retention.",
        consideration: "Partition count determines maximum consumer parallelism; plan partition count based on expected peak throughput and number of Flink task slots.",
        docsUrl: "https://kafka.apache.org/documentation/",
      },
    },
  },
  {
    id: "schema-registry",
    data: {
      label: "Schema Registry",
      subtitle: "Avro / Protobuf",
      icon: "📋",
      layer: "ingestion",
      detail: {
        tool: "Confluent Schema Registry",
        category: "Schema Management",
        purpose: "Centralised schema management for Avro/Protobuf/JSON schemas, enforcing compatibility rules on all events.",
        consideration: "Schema Registry is a single point of failure; deploy it with replication and implement producer-side schema caching for resilience.",
        docsUrl: "https://docs.confluent.io/platform/current/schema-registry/index.html",
      },
    },
  },
  // Stream Processing
  {
    id: "flink-stateless",
    data: {
      label: "Flink Stateless",
      subtitle: "Transforms",
      icon: "🌊",
      layer: "transform",
      detail: {
        tool: "Apache Flink",
        category: "Stream Processor",
        purpose: "Stateless Flink operators handle filtering, field mapping, enrichment lookups, and format conversion at scale.",
        consideration: "Even 'stateless' operators in Flink maintain operator state for exactly-once semantics; size your TaskManager heap accordingly.",
        docsUrl: "https://nightlies.apache.org/flink/flink-docs-stable/",
      },
    },
  },
  {
    id: "flink-stateful",
    data: {
      label: "Flink Stateful",
      subtitle: "Aggregations",
      icon: "🔢",
      layer: "transform",
      detail: {
        tool: "Apache Flink",
        category: "Stream Processor",
        purpose: "Stateful Flink operators compute windowed aggregations (tumbling, sliding, session windows) over event streams.",
        consideration: "Large state backends (RocksDB) can cause GC pauses; monitor state size and configure incremental checkpointing to avoid job instability.",
        docsUrl: "https://nightlies.apache.org/flink/flink-docs-stable/docs/dev/datastream/operators/windows/",
      },
    },
  },
  {
    id: "flink-cep",
    data: {
      label: "Flink CEP",
      subtitle: "Pattern Detection",
      icon: "🔍",
      layer: "transform",
      detail: {
        tool: "Apache Flink CEP",
        category: "Complex Event Processing",
        purpose: "Detects complex event patterns across streams — e.g., fraud detection, equipment failure sequences, funnel completion.",
        consideration: "CEP patterns with large state windows can accumulate significant state; implement NFA state pruning and set appropriate pattern timeouts.",
        docsUrl: "https://nightlies.apache.org/flink/flink-docs-stable/docs/libs/cep/",
      },
    },
  },
  // Serving Layer Storage
  {
    id: "iceberg-write",
    data: {
      label: "Iceberg Streaming",
      subtitle: "Stream-to-Table",
      icon: "🧊",
      layer: "storage",
      detail: {
        tool: "Apache Iceberg",
        category: "Table Format",
        purpose: "Flink writes streaming data to Iceberg tables via the Flink Iceberg sink for reliable, transactional stream-to-table writes.",
        consideration: "Small file problem is amplified with streaming writes; configure Iceberg's file compaction and use Flink's streaming compaction operator.",
        docsUrl: "https://iceberg.apache.org/docs/latest/flink/",
      },
    },
  },
  {
    id: "redis",
    data: {
      label: "Redis",
      subtitle: "Low-latency Lookup",
      icon: "⚡",
      layer: "storage",
      detail: {
        tool: "Redis",
        category: "In-memory Store",
        purpose: "Stores pre-computed aggregations and enrichment data for sub-millisecond lookup during stream processing.",
        consideration: "Redis is an in-memory store; plan capacity carefully and use Redis Cluster for datasets exceeding single-node memory.",
        docsUrl: "https://redis.io/docs/",
      },
    },
  },
  {
    id: "elasticsearch",
    data: {
      label: "Elasticsearch",
      subtitle: "Search + Alerts",
      icon: "🔎",
      layer: "storage",
      detail: {
        tool: "Elasticsearch",
        category: "Search & Analytics",
        purpose: "Indexes streaming events for near-real-time search and powers alerting rules via Kibana Watcher.",
        consideration: "Elasticsearch shard management is complex at scale; monitor shard count, use ILM policies, and avoid over-sharding small indices.",
        docsUrl: "https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html",
      },
    },
  },
  // Orchestration
  {
    id: "flink-jobmanager",
    data: {
      label: "Flink JobManager",
      subtitle: "Job Coordination",
      icon: "🎯",
      layer: "orchestrate",
      detail: {
        tool: "Flink JobManager",
        category: "Job Orchestration",
        purpose: "Coordinates Flink job execution, manages task scheduling, and handles failure recovery via checkpoints.",
        consideration: "JobManager is a single point of failure in standalone mode; deploy in HA mode with ZooKeeper or Kubernetes for production workloads.",
        docsUrl: "https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/flink-architecture/",
      },
    },
  },
  {
    id: "kafka-connect-sink",
    data: {
      label: "Kafka Connect",
      subtitle: "Sink Connectors",
      icon: "🔌",
      layer: "orchestrate",
      detail: {
        tool: "Kafka Connect",
        category: "Sink Integration",
        purpose: "Routes processed Kafka events to downstream sinks (Elasticsearch, Redis, S3) via managed connector framework.",
        consideration: "Sink connector failures can block consumer group progress; implement dead-letter queues (DLQ) to isolate bad messages without stopping the pipeline.",
        docsUrl: "https://docs.confluent.io/platform/current/connect/index.html",
      },
    },
  },
  // Consumers
  {
    id: "realtime-dashboard",
    data: {
      label: "Real-time Dashboard",
      subtitle: "Live Metrics",
      icon: "📊",
      layer: "serving",
      detail: {
        tool: "Grafana / Kibana",
        category: "Real-time Visualization",
        purpose: "Displays live streaming metrics, KPIs, and operational dashboards with sub-second refresh rates.",
        consideration: "High-frequency dashboard refreshes put significant load on the backing store; use pre-aggregated time-series tables and caching layers.",
        docsUrl: "https://grafana.com/docs/",
      },
    },
  },
  {
    id: "alerting-system",
    data: {
      label: "Alerting System",
      subtitle: "Anomaly & SLA Alerts",
      icon: "🚨",
      layer: "serving",
      detail: {
        tool: "PagerDuty / OpsGenie",
        category: "Incident Management",
        purpose: "Triggers alerts and pages on-call engineers when CEP patterns detect anomalies or SLA thresholds are breached.",
        consideration: "Alert fatigue is real; implement intelligent alert routing, deduplication, and suppression windows to avoid overwhelming on-call teams.",
        docsUrl: "https://www.pagerduty.com/docs/",
      },
    },
  },
  {
    id: "downstream-topics",
    data: {
      label: "Downstream Topics",
      subtitle: "Event Fan-out",
      icon: "📬",
      layer: "serving",
      detail: {
        tool: "Apache Kafka",
        category: "Event Distribution",
        purpose: "Processed and enriched events are published to downstream Kafka topics for consumption by other services.",
        consideration: "Downstream topic consumers may have very different SLAs; use separate consumer groups with independent lag monitoring to avoid cascade failures.",
        docsUrl: "https://kafka.apache.org/documentation/",
      },
    },
  },
];

const edges: RawEdge[] = [
  { id: "e-micro-producers", source: "microservice-events", target: "kafka-producers", animated: true, type: "smoothstep" },
  { id: "e-iot-producers", source: "iot-sensors", target: "kafka-producers", animated: true, type: "smoothstep" },
  { id: "e-click-producers", source: "clickstream", target: "kafka-producers", animated: true, type: "smoothstep" },
  { id: "e-producers-topics", source: "kafka-producers", target: "kafka-topics-main", animated: true, type: "smoothstep" },
  { id: "e-topics-schema", source: "kafka-topics-main", target: "schema-registry", animated: false, type: "smoothstep" },
  { id: "e-topics-stateless", source: "kafka-topics-main", target: "flink-stateless", animated: true, type: "smoothstep" },
  { id: "e-stateless-stateful", source: "flink-stateless", target: "flink-stateful", animated: true, type: "smoothstep" },
  { id: "e-stateless-cep", source: "flink-stateless", target: "flink-cep", animated: true, type: "smoothstep" },
  { id: "e-stateful-iceberg", source: "flink-stateful", target: "iceberg-write", animated: true, type: "smoothstep" },
  { id: "e-stateful-redis", source: "flink-stateful", target: "redis", animated: true, type: "smoothstep" },
  { id: "e-cep-elastic", source: "flink-cep", target: "elasticsearch", animated: true, type: "smoothstep" },
  { id: "e-jobmanager-stateless", source: "flink-jobmanager", target: "flink-stateless", animated: false, type: "smoothstep" },
  { id: "e-jobmanager-stateful", source: "flink-jobmanager", target: "flink-stateful", animated: false, type: "smoothstep" },
  { id: "e-jobmanager-cep", source: "flink-jobmanager", target: "flink-cep", animated: false, type: "smoothstep" },
  { id: "e-connect-topics", source: "kafka-topics-main", target: "kafka-connect-sink", animated: true, type: "smoothstep" },
  { id: "e-connect-elastic", source: "kafka-connect-sink", target: "elasticsearch", animated: true, type: "smoothstep" },
  { id: "e-redis-dashboard", source: "redis", target: "realtime-dashboard", animated: true, type: "smoothstep" },
  { id: "e-elastic-alerts", source: "elasticsearch", target: "alerting-system", animated: true, type: "smoothstep" },
  { id: "e-stateless-downstream", source: "flink-stateless", target: "downstream-topics", animated: true, type: "smoothstep" },
];

const streamingMeta: PipelineMeta = {
  title: "Streaming Architecture",
  description:
    "A real-time streaming architecture using Kafka as the event backbone, Apache Flink for stateful stream processing, and Iceberg for reliable stream-to-table writes.",
  route: "/pipelines/streaming",
  nodes,
  edges,
};

export default streamingMeta;
