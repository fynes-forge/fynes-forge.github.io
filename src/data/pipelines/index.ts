import lakehouseMeta from "./lakehouse";
import gcpMeta from "./gcp";
import streamingMeta from "./streaming";
import eltMeta from "./elt";
import type { PipelineMeta } from "../../components/PipelineViz/PipelineLayout";

export interface PipelineGalleryItem extends PipelineMeta {
  id: string;
  techStack: string[];
  complexity: "Intermediate" | "Advanced";
  shortDescription: string;
  emoji: string;
  accentColor: string;
}

export const PIPELINES: PipelineGalleryItem[] = [
  {
    ...lakehouseMeta,
    id: "lakehouse",
    emoji: "🏔️",
    accentColor: "#AED6F1",
    techStack: ["Apache Iceberg", "Trino", "SQLMesh", "Airflow", "Debezium"],
    complexity: "Advanced",
    shortDescription:
      "A modern open lakehouse with medallion architecture — bronze, silver, and gold layers backed by Iceberg on S3, queried via Trino.",
  },
  {
    ...gcpMeta,
    id: "gcp",
    emoji: "☁️",
    accentColor: "#a9e34b",
    techStack: ["BigQuery", "Dataflow", "dbt", "Pub/Sub", "Composer"],
    complexity: "Advanced",
    shortDescription:
      "A fully managed, GCP-native pipeline from Pub/Sub event ingestion through Dataflow processing to BigQuery analytics.",
  },
  {
    ...streamingMeta,
    id: "streaming",
    emoji: "⚡",
    accentColor: "#ffa94d",
    techStack: ["Apache Kafka", "Apache Flink", "Iceberg", "Redis", "Elasticsearch"],
    complexity: "Advanced",
    shortDescription:
      "A real-time streaming architecture with Kafka as the event backbone and Flink for stateful aggregations, CEP, and stream-to-table writes.",
  },
  {
    ...eltMeta,
    id: "elt",
    emoji: "🔄",
    accentColor: "#B7C3F3",
    techStack: ["Fivetran", "Snowflake", "dbt", "Census", "Tableau"],
    complexity: "Intermediate",
    shortDescription:
      "A SaaS-first ELT pattern — Fivetran handles zero-code ingestion into Snowflake, dbt handles modular tested transformations.",
  },
];

export { lakehouseMeta, gcpMeta, streamingMeta, eltMeta };
