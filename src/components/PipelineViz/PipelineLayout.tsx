/**
 * PipelineLayout — shared wrapper used by every pipeline page.
 */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import {
  Maximize2,
  PanelRightOpen,
  PanelRightClose,
  X,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import PipelineNode, { type PipelineNodeData } from "./PipelineNode";
import {
  LAYER_COLORS,
  LAYER_COLORS_DARK,
  ALL_LAYERS,
  type LayerType,
} from "./pipelineTheme";
import "@xyflow/react/dist/style.css";

// ── Dagre auto-layout ────────────────────────────────────────────────────────
const NODE_WIDTH = 190;
const NODE_HEIGHT = 72;

export function getLayoutedElements(
  nodes: Node<PipelineNodeData>[],
  edges: Edge[],
): { nodes: Node<PipelineNodeData>[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "LR", nodesep: 55, ranksep: 90, marginx: 30, marginy: 30 });
  nodes.forEach((n) => g.setNode(n.id, { width: NODE_WIDTH, height: NODE_HEIGHT }));
  edges.forEach((e) => g.setEdge(e.source, e.target));
  dagre.layout(g);
  return {
    nodes: nodes.map((n) => {
      const { x, y } = g.node(n.id);
      return { ...n, position: { x: x - NODE_WIDTH / 2, y: y - NODE_HEIGHT / 2 } };
    }),
    edges,
  };
}

// ── Types ────────────────────────────────────────────────────────────────────
export interface RawNode {
  id: string;
  data: PipelineNodeData;
  position?: { x: number; y: number };
}

export interface RawEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  type?: string;
}

export interface PipelineMeta {
  title: string;
  description: string;
  route: string;
  nodes: RawNode[];
  edges: RawEdge[];
}

// ── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({
  node,
  onClose,
  isDark,
}: {
  node: Node<PipelineNodeData> | null;
  onClose: () => void;
  isDark: boolean;
}) {
  if (!node) return null;
  const { data } = node;
  const palette = isDark ? LAYER_COLORS_DARK : LAYER_COLORS;
  const colors = palette[data.layer] ?? palette.source;

  const panelStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    width: "280px",
    height: "100%",
    background: "var(--ifm-background-color)",
    borderLeft: "1px solid var(--ifm-color-emphasis-300)",
    borderTop: `4px solid ${colors.border}`,
    boxShadow: "-4px 0 16px rgba(0,0,0,0.12)",
    zIndex: 10,
    overflowY: "auto",
    padding: "1rem",
    boxSizing: "border-box",
  };

  return (
    <div style={panelStyle}>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--ifm-font-color-base)",
          padding: 4,
          borderRadius: 4,
        }}
        aria-label="Close"
      >
        <X size={16} />
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "2rem" }} role="img" aria-label={data.label}>
          {data.icon}
        </span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{data.detail.tool}</div>
          <span
            style={{
              display: "inline-block",
              padding: "1px 8px",
              borderRadius: 12,
              fontSize: "0.7rem",
              fontWeight: 600,
              background: colors.bg,
              color: colors.border,
              border: `1px solid ${colors.border}`,
              marginTop: 2,
            }}
          >
            {colors.label ?? data.layer}
          </span>
        </div>
      </div>

      {data.detail.category && (
        <p style={{ fontSize: "0.78rem", color: "var(--ifm-color-emphasis-600)", marginBottom: "0.5rem" }}>
          {data.detail.category}
        </p>
      )}

      <div style={{ marginBottom: "0.75rem" }}>
        <h4 style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.3rem", color: colors.border }}>
          Purpose
        </h4>
        <p style={{ fontSize: "0.82rem", margin: 0, lineHeight: 1.5 }}>{data.detail.purpose}</p>
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <h4 style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.3rem", color: colors.border }}>
          ⚠ Real-world consideration
        </h4>
        <p style={{ fontSize: "0.82rem", margin: 0, lineHeight: 1.5 }}>{data.detail.consideration}</p>
      </div>

      {data.detail.docsUrl && (
        <a
          href={data.detail.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--ifm-color-primary)",
            textDecoration: "none",
          }}
        >
          Learn More <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}

// ── Mobile static summary ─────────────────────────────────────────────────────
function MobileSummary({
  nodes,
  title,
  description,
}: {
  nodes: RawNode[];
  title: string;
  description: string;
}) {
  return (
    <div style={{ padding: "1rem 1.5rem" }}>
      <Link
        to="/pipelines"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          marginBottom: "1rem",
          fontSize: "0.85rem",
        }}
      >
        <ArrowLeft size={14} /> Back to Pipelines
      </Link>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{title}</h1>
      <p style={{ color: "var(--ifm-color-emphasis-600)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
        {description}
      </p>
      <p style={{ fontSize: "0.85rem", color: "var(--ifm-color-emphasis-500)", marginBottom: "1rem" }}>
        Interactive visualizer available on desktop. Pipeline summary:
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
          <thead>
            <tr>
              {["Layer", "Tool", "Role"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "0.5rem 0.75rem",
                    textAlign: "left",
                    borderBottom: "2px solid var(--ifm-color-emphasis-300)",
                    background: "var(--ifm-color-emphasis-100)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nodes.map((n) => {
              const colors = LAYER_COLORS[n.data.layer];
              return (
                <tr key={n.id} style={{ borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>
                  <td style={{ padding: "0.45rem 0.75rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 10,
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        background: colors.bg,
                        color: colors.border,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {colors.label}
                    </span>
                  </td>
                  <td style={{ padding: "0.45rem 0.75rem", fontWeight: 600 }}>{n.data.label}</td>
                  <td style={{ padding: "0.45rem 0.75rem", color: "var(--ifm-color-emphasis-600)" }}>
                    {n.data.subtitle}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── FlowInner — everything requiring useReactFlow context ────────────────────
interface FlowInnerProps {
  rawNodes: RawNode[];
  rawEdges: RawEdge[];
  onNodeSelect: (node: Node<PipelineNodeData> | null) => void;
  selectedNodeId: string | null;
  showPanel: boolean;
  selectedNode: Node<PipelineNodeData> | null;
  onClosePanel: () => void;
  isDark: boolean;
}

function FlowInner({
  rawNodes,
  rawEdges,
  onNodeSelect,
  selectedNodeId,
  showPanel,
  selectedNode,
  onClosePanel,
  isDark,
}: FlowInnerProps) {
  const { fitView } = useReactFlow();

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    const rfNodes: Node<PipelineNodeData>[] = rawNodes.map((n) => ({
      id: n.id,
      type: "pipelineNode",
      position: n.position ?? { x: 0, y: 0 },
      data: n.data,
    }));
    const rfEdges: Edge[] = rawEdges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      animated: e.animated ?? true,
      type: e.type ?? "smoothstep",
      style: { strokeWidth: 2, stroke: isDark ? "#64748b" : "#94a3b8" },
    }));
    return getLayoutedElements(rfNodes, rfEdges);
  }, [rawNodes, rawEdges, isDark]);

  const [nodes, , onNodesChange] = useNodesState<Node<PipelineNodeData>>(layoutedNodes);
  const [edges, , onEdgesChange] = useEdgesState(layoutedEdges);

  const nodeTypes = useMemo(() => ({ pipelineNode: PipelineNode }), []);

  const onNodeClick: NodeMouseHandler<Node<PipelineNodeData>> = useCallback(
    (_evt, node) => onNodeSelect(node),
    [onNodeSelect],
  );
  const onPaneClick = useCallback(() => onNodeSelect(null), [onNodeSelect]);

  const handleFitView = useCallback(() => {
    fitView({ padding: 0.15, duration: 500 });
  }, [fitView]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.25}
        maxZoom={2.5}
        proOptions={{ hideAttribution: false }}
      >
        <Background gap={20} size={1} color={isDark ? "#334155" : "#cbd5e1"} />
        <Controls />
        <MiniMap
          nodeColor={(n) => {
            const d = n.data as PipelineNodeData;
            const palette = isDark ? LAYER_COLORS_DARK : LAYER_COLORS;
            return d ? (palette[d.layer]?.border ?? "#94a3b8") : "#94a3b8";
          }}
          maskColor={isDark ? "rgba(30,41,59,0.6)" : "rgba(255,255,255,0.6)"}
        />
        {/* Fit-view button lives inside ReactFlow so useReactFlow is valid */}
        <FitViewButton onFitView={handleFitView} />
      </ReactFlow>
      {showPanel && (
        <DetailPanel node={selectedNode} onClose={onClosePanel} isDark={isDark} />
      )}
    </div>
  );
}

// ── Fit-view button rendered as a ReactFlow custom control ───────────────────
function FitViewButton({ onFitView }: { onFitView: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "0.75rem",
        left: "0.75rem",
        zIndex: 5,
      }}
    >
      <button
        onClick={onFitView}
        style={toolbarBtnStyle}
        title="Fit view"
      >
        <Maximize2 size={13} /> Fit View
      </button>
    </div>
  );
}

// ── PipelineLayoutInner ───────────────────────────────────────────────────────
interface PipelineLayoutProps {
  meta: PipelineMeta;
}

function PipelineLayoutInner({ meta }: PipelineLayoutProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [isMobile, setIsMobile] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node<PipelineNodeData> | null>(null);
  const [showPanel, setShowPanel] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const palette = isDark ? LAYER_COLORS_DARK : LAYER_COLORS;

  if (isMobile) {
    return (
      <MobileSummary
        nodes={meta.nodes}
        title={meta.title}
        description={meta.description}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 60px)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ padding: "0.75rem 1.5rem 0.4rem", flexShrink: 0 }}>
        <Link
          to="/pipelines"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.8rem",
            color: "var(--ifm-color-emphasis-600)",
            textDecoration: "none",
            marginBottom: "0.4rem",
          }}
        >
          <ArrowLeft size={13} /> Back to Pipelines
        </Link>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0 0 0.2rem" }}>
          {meta.title}
        </h1>
        <p style={{ color: "var(--ifm-color-emphasis-600)", margin: 0, fontSize: "0.85rem" }}>
          {meta.description}
        </p>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.45rem 1rem",
          background: isDark ? "#0f172a" : "#f8fafc",
          borderBottom: "1px solid var(--ifm-color-emphasis-200)",
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setShowPanel((p) => !p)}
          style={toolbarBtnStyle}
          title={showPanel ? "Hide detail panel" : "Show detail panel"}
        >
          {showPanel ? <PanelRightClose size={13} /> : <PanelRightOpen size={13} />}
          {showPanel ? "Hide Panel" : "Show Panel"}
        </button>

        {/* Legend */}
        <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", marginLeft: "auto" }}>
          {ALL_LAYERS.map((layer) => {
            const c = palette[layer];
            return (
              <span
                key={layer}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "0.75rem",
                  color: "var(--ifm-font-color-base)",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: c.border,
                    display: "inline-block",
                  }}
                />
                {c.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Canvas area */}
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <ReactFlowProvider>
          <FlowInner
            rawNodes={meta.nodes}
            rawEdges={meta.edges}
            onNodeSelect={(n) => {
              setSelectedNode(n);
              if (n && !showPanel) setShowPanel(true);
            }}
            selectedNodeId={selectedNode?.id ?? null}
            showPanel={showPanel}
            selectedNode={selectedNode}
            onClosePanel={() => setSelectedNode(null)}
            isDark={isDark}
          />
        </ReactFlowProvider>
      </div>

      {/* Bottom legend */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          padding: "0.4rem 1rem",
          background: isDark ? "#0f172a" : "#f8fafc",
          borderTop: "1px solid var(--ifm-color-emphasis-200)",
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        {ALL_LAYERS.map((layer) => {
          const c = palette[layer];
          return (
            <span
              key={layer}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem" }}
            >
              <span
                style={{
                  width: 14,
                  height: 8,
                  borderRadius: 2,
                  background: c.bg,
                  border: `2px solid ${c.border}`,
                  display: "inline-block",
                }}
              />
              {c.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const toolbarBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.3rem",
  padding: "0.3rem 0.75rem",
  fontSize: "0.78rem",
  fontWeight: 600,
  borderRadius: 6,
  border: "1px solid var(--ifm-color-emphasis-300)",
  background: "var(--ifm-background-color)",
  color: "var(--ifm-font-color-base)",
  cursor: "pointer",
};

export default function PipelineLayout({ meta }: PipelineLayoutProps) {
  return (
    <Layout title={meta.title} description={meta.description}>
      <PipelineLayoutInner meta={meta} />
    </Layout>
  );
}
