import React from "react";
import PipelineLayout from "../../components/PipelineViz/PipelineLayout";
import gcpMeta from "../../data/pipelines/gcp";

export default function GcpPage() {
  return <PipelineLayout meta={gcpMeta} />;
}
