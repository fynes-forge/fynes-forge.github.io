import React from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useColorMode } from "@docusaurus/theme-common";
import { LAYER_COLORS, LAYER_COLORS_DARK, type LayerType } from "./pipelineTheme";
import styles from "./PipelineNode.module.css";

export interface PipelineNodeDetail {
  tool: string;
  purpose: string;
  consideration: string;
  docsUrl?: string;
  category?: string;
}

export interface PipelineNodeData {
  label: string;
  subtitle: string;
  icon: string;
  layer: LayerType;
  detail: PipelineNodeDetail;
  [key: string]: unknown;
}

interface PipelineNodeProps extends NodeProps {
  data: PipelineNodeData;
  selected?: boolean;
}

export default function PipelineNode({ data, selected }: PipelineNodeProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const palette = isDark ? LAYER_COLORS_DARK : LAYER_COLORS;
  const colors = palette[data.layer] ?? palette.source;

  return (
    <>
      <Handle type="target" position={Position.Left} style={{ background: colors.border }} />
      <div
        className={styles.node}
        style={{
          "--node-accent-color": colors.border,
          "--node-border-color": isDark ? "#334155" : "#e2e8f0",
          "--node-bg-color": colors.bg,
          boxShadow: selected
            ? `0 0 0 3px ${colors.border}, 0 4px 16px rgba(0,0,0,0.18)`
            : "0 2px 8px rgba(0,0,0,0.10)",
        } as React.CSSProperties}
      >
        <span className={styles.icon} role="img" aria-label={data.label}>
          {data.icon}
        </span>
        <div className={styles.textGroup}>
          <span className={styles.label}>{data.label}</span>
          <span className={styles.subtitle}>{data.subtitle}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Right} style={{ background: colors.border }} />
    </>
  );
}
