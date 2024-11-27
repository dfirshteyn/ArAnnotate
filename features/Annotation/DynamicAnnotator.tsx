"use client"

import dynamic from "next/dynamic";

const DynamicAnnotator = dynamic(() => import("@/features/Annotation/Annotator"), {
  ssr: false,
});

const AnnotatorWrapper = () => {
  return (
    <DynamicAnnotator />
  );
};

export default AnnotatorWrapper;