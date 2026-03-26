import React from "react";
import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import type { PipelineNodeData } from "../../data/pipelineData";
import { LAYER_COLORS, LAYER_BG, LAYER_BG_DARK } from "../../data/pipelineData";

interface PipelineNodeProps extends NodeProps {
  data: PipelineNodeData;
  selected?: boolean;
}

/**
 * Custom React Flow node rendered for every stage of the pipeline.
 * Color-coded by layer, supports dark mode, and highlights when selected.
 */
export default function PipelineNode({ data, selected }: PipelineNodeProps) {
  const borderColor = LAYER_COLORS[data.layer];
  const bgLight = LAYER_BG[data.layer];
  const bgDark = LAYER_BG_DARK[data.layer];

  return (
    <>
      <Handle type="target" position={Position.Left} style={{ background: borderColor }} />
      <div
        className="pipeline-node"
        style={
          {
            "--node-border": borderColor,
            "--node-bg-light": bgLight,
            "--node-bg-dark": bgDark,
            boxShadow: selected
              ? `0 0 0 3px ${borderColor}, 0 4px 16px rgba(0,0,0,0.18)`
              : "0 2px 8px rgba(0,0,0,0.12)",
          } as React.CSSProperties
        }
      >
        <span className="pipeline-node__icon" role="img" aria-label={data.label}>
          {data.icon}
        </span>
        <div className="pipeline-node__text">
          <span className="pipeline-node__label">{data.label}</span>
          <span className="pipeline-node__subtitle">{data.subtitle}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Right} style={{ background: borderColor }} />
    </>
  );
}
