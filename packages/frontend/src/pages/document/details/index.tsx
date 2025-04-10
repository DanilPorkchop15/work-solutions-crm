import React from "react";
import { useTitle } from "react-use";
import { DocumentVersionTableModuleProvider } from "@frontend/entities/document";
import { DocumentDetailsProvider, DocumentsTableModuleProvider } from "@frontend/entities/document/model/document";
import { Divider, Flex, Typography } from "antd";

import { AppTitles } from "../../../shared/model/services";
import { Layout } from "../../../shared/ui/layout";
import { DocumentDetailsWidget } from "../../../widgets/document/details";

export function DocumentDetailsPage() {
  useTitle(AppTitles.getDocumentTitle());

  return (
    <Layout.Content>
      <DocumentsTableModuleProvider>
        <DocumentDetailsProvider>
          <DocumentVersionTableModuleProvider>
            <Flex vertical gap={24}>
              <Typography.Title level={3}>Информация о документе</Typography.Title>
              <DocumentDetailsWidget.Form />
            </Flex>
            <Divider />
            <Flex vertical gap={24}>
              <Typography.Title level={3}>Версии документа</Typography.Title>
              <DocumentDetailsWidget.VersionsTable />
            </Flex>
          </DocumentVersionTableModuleProvider>
        </DocumentDetailsProvider>
      </DocumentsTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(DocumentDetailsPage);
