import React from "react";
import PipelineLayout from "../../components/PipelineViz/PipelineLayout";
import eltMeta from "../../data/pipelines/elt";

export default function EltPage() {
  return <PipelineLayout meta={eltMeta} />;
}
