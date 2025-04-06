import React from "react";
import { DocumentDetailsProvider } from "@frontend/entities/document/model/document";

import { DocumentUpdateFeature } from "../../../features/document/update";

function DocumentUpdatePage() {
  return (
    <DocumentDetailsProvider>
      <DocumentUpdateFeature.Modal />
    </DocumentDetailsProvider>
  );
}

export const Component = React.memo(DocumentUpdatePage);
