import React from "react";
import { useTitle } from "react-use";
import { DocumentLogsTableModuleProvider, DocumentVersionTableModuleProvider } from "@frontend/entities/document";
import { DocumentDetailsProvider, DocumentsTableModuleProvider } from "@frontend/entities/document/model/document";
import { Flex, Splitter, Typography } from "antd";

import { AppTitles } from "../../../shared/model/services";
import { Layout } from "../../../shared/ui/layout";
import { DocumentDetailsWidget } from "../../../widgets/document/details";
import { DocumentLogsWidget } from "../../../widgets/document/logs/index";
import { DocumentVersionsWidget } from "../../../widgets/document/versions/index";

export function DocumentDetailsPage() {
  useTitle(AppTitles.getDocumentTitle());

  return (
    <Layout.Content>
      <DocumentsTableModuleProvider>
        <DocumentDetailsProvider>
          <DocumentVersionTableModuleProvider>
            <DocumentLogsTableModuleProvider>
              <Splitter layout="vertical">
                <Splitter.Panel resizable={true} collapsible={{ end: true }} defaultSize="50%">
                  <Splitter>
                    <Splitter.Panel resizable={false} defaultSize="40%">
                      <Flex vertical gap={24} className="pr-8">
                        <Typography.Title level={3}>Информация о документе</Typography.Title>
                        <DocumentDetailsWidget />
                      </Flex>
                    </Splitter.Panel>
                    <Splitter.Panel resizable={false}>
                      <Flex vertical gap={24} className="pl-8">
                        <Typography.Title level={3}>История изменений</Typography.Title>
                        <DocumentLogsWidget />
                      </Flex>
                    </Splitter.Panel>
                  </Splitter>
                </Splitter.Panel>
                <Splitter.Panel resizable={true} collapsible={{ start: true }}>
                  <Flex vertical gap={24} className="pt-8">
                    <Typography.Title level={3}>Версии документа</Typography.Title>
                    <DocumentVersionsWidget />
                  </Flex>
                </Splitter.Panel>
              </Splitter>
            </DocumentLogsTableModuleProvider>
          </DocumentVersionTableModuleProvider>
        </DocumentDetailsProvider>
      </DocumentsTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(DocumentDetailsPage);
