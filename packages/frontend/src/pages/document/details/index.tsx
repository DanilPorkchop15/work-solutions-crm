import React from "react";
import { useTitle } from "react-use";
import {
  DocumentCommentsTableModuleProvider,
  DocumentLogsTableModuleProvider,
  DocumentVersionTableModuleProvider
} from "@frontend/entities/document";
import { DocumentDetailsProvider, DocumentsTableModuleProvider } from "@frontend/entities/document/model/document";
import { Flex, Splitter, Tabs, Typography } from "antd";

import { AppTitles } from "../../../shared/model/services";
import { Layout } from "../../../shared/ui/layout";
import { DocumentCommentsWidget } from "../../../widgets/document/comments";
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
              <DocumentCommentsTableModuleProvider>
                <Splitter layout="vertical">
                  <Splitter.Panel collapsible={{ end: true }}>
                    <Splitter>
                      <Splitter.Panel resizable={false}>
                        <Flex vertical gap={24} className="pr-8">
                          <Typography.Title level={3}>Информация о документе</Typography.Title>
                          <DocumentDetailsWidget />
                        </Flex>
                      </Splitter.Panel>
                      <Splitter.Panel resizable={false}>
                        <Flex vertical gap={24} className="pl-8">
                          <Tabs
                            items={[
                              {
                                label: "Комментарии",
                                key: "comments",
                                children: <DocumentCommentsWidget />
                              },
                              {
                                label: "История изменений",
                                key: "logs",
                                children: <DocumentLogsWidget />
                              }
                            ]}
                          />
                        </Flex>
                      </Splitter.Panel>
                    </Splitter>
                  </Splitter.Panel>
                  <Splitter.Panel resizable={true} collapsible={{ start: true }}>
                    <Flex vertical gap={24} className="mt-8">
                      <Typography.Title level={3}>Версии документа</Typography.Title>
                      <DocumentVersionsWidget />
                    </Flex>
                  </Splitter.Panel>
                </Splitter>
              </DocumentCommentsTableModuleProvider>
            </DocumentLogsTableModuleProvider>
          </DocumentVersionTableModuleProvider>
        </DocumentDetailsProvider>
      </DocumentsTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(DocumentDetailsPage);
