export type LayerType =
  | "source"
  | "ingestion"
  | "storage"
  | "transform"
  | "orchestrate"
  | "serving";

export interface LayerColorDef {
  bg: string;
  border: string;
  label: string;
}

export const LAYER_COLORS: Record<LayerType, LayerColorDef> = {
  source:      { bg: "#e3f2fd", border: "#1565c0", label: "Source" },
  ingestion:   { bg: "#fff3e0", border: "#e65100", label: "Ingestion" },
  storage:     { bg: "#f3e5f5", border: "#6a1b9a", label: "Storage" },
  transform:   { bg: "#e8f5e9", border: "#2e7d32", label: "Transform" },
  orchestrate: { bg: "#fce4ec", border: "#880e4f", label: "Orchestration" },
  serving:     { bg: "#e0f7fa", border: "#006064", label: "Serving" },
};

export const LAYER_COLORS_DARK: Record<LayerType, LayerColorDef> = {
  source:      { bg: "#1a2f4a", border: "#64b5f6", label: "Source" },
  ingestion:   { bg: "#3e1f00", border: "#ffb74d", label: "Ingestion" },
  storage:     { bg: "#2d1b4e", border: "#ce93d8", label: "Storage" },
  transform:   { bg: "#1b3a1f", border: "#81c784", label: "Transform" },
  orchestrate: { bg: "#3e0a1e", border: "#f48fb1", label: "Orchestration" },
  serving:     { bg: "#003333", border: "#4dd0e1", label: "Serving" },
};

export const ALL_LAYERS = Object.keys(LAYER_COLORS) as LayerType[];
