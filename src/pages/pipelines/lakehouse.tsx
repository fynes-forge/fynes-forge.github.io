import React from "react";
import PipelineLayout from "../../components/PipelineViz/PipelineLayout";
import lakehouseMeta from "../../data/pipelines/lakehouse";

export default function LakehousePage() {
  return <PipelineLayout meta={lakehouseMeta} />;
}
