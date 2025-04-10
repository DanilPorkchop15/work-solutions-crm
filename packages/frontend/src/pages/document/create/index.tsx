import React from "react";

import { DocumentCreateFeature } from "../../../features/document/create";

function DocumentCreatePage() {
  return <DocumentCreateFeature.Modal />;
}

export const Component = React.memo(DocumentCreatePage);
