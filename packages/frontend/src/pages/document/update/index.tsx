import React from "react";
import { DocumentLogsTableModuleProvider } from "@frontend/entities/document";
import { DocumentDetailsProvider, DocumentsTableModuleProvider } from "@frontend/entities/document/model/document";

import { DocumentUpdateFeature } from "../../../features/document/update";

function DocumentUpdatePage() {
  return (
    <DocumentLogsTableModuleProvider>
      <DocumentsTableModuleProvider>
        <DocumentDetailsProvider>
          <DocumentUpdateFeature.Modal />
        </DocumentDetailsProvider>
      </DocumentsTableModuleProvider>
    </DocumentLogsTableModuleProvider>
  );
}

export const Component = React.memo(DocumentUpdatePage);
