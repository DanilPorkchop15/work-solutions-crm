import React from "react";
import { useTitle } from "react-use";
import { ProjectDetailsProvider, ProjectLogsTableModuleProvider, ProjectsTableModuleProvider } from "@frontend/entities/project/model";
import { Flex, Splitter, Typography } from "antd";

import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout";
import { ProjectDetailsWidget } from "../../../widgets/project/details";

export function ProjectDetailsPage() {
  useTitle(AppTitles.getProjectTitle());

  return (
    <Layout.Content>
      <ProjectsTableModuleProvider>
        <ProjectDetailsProvider>
          <ProjectLogsTableModuleProvider>
            <Splitter>
              <Splitter.Panel resizable={false} defaultSize="50%">
                <Flex vertical gap={24} className="pr-8">
                  <Typography.Title level={3}>Информация о проекте</Typography.Title>
                  <ProjectDetailsWidget.Form />
                </Flex>
              </Splitter.Panel>
              <Splitter.Panel resizable={false}>
                <Flex vertical gap={24} className="pl-8">
                  <Typography.Title level={3}>История изменений</Typography.Title>
                  <ProjectDetailsWidget.LogsTable />
                </Flex>
              </Splitter.Panel>
            </Splitter>
          </ProjectLogsTableModuleProvider>
        </ProjectDetailsProvider>
      </ProjectsTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(ProjectDetailsPage);
