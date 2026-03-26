import React from "react";
import PipelineLayout from "../../components/PipelineViz/PipelineLayout";
import streamingMeta from "../../data/pipelines/streaming";

export default function StreamingPage() {
  return <PipelineLayout meta={streamingMeta} />;
}
