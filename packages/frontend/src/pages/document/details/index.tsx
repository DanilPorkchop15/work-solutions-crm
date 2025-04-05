import React from "react";
import { useTitle } from "react-use";
import { DocumentDetailsProvider, DocumentsTableModuleProvider } from "@frontend/entities/document/model";

import { AppTitles } from "../../../shared/model/services";
import { Layout } from "../../../shared/ui/layout";
import { DocumentDetailsWidget } from "../../../widgets/document/details";

export function DocumentDetailsPage() {
  useTitle(AppTitles.getDocumentTitle());

  return (
    <Layout.Content>
      <DocumentsTableModuleProvider>
        <DocumentDetailsProvider>
          <DocumentDetailsWidget />
        </DocumentDetailsProvider>
      </DocumentsTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(DocumentDetailsPage);
