import React, { useState } from "react";
import { useTitle } from "react-use";
import {
  ProjectCommentsTableModuleProvider,
  ProjectDetailsProvider,
  ProjectLogsTableModuleProvider,
  ProjectsTableModuleProvider
} from "@frontend/entities/project/model";
import { Flex, Splitter, Tabs, Typography } from "antd";

import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout";
import { ProjectCommentsWidget } from "../../../widgets/project/comments";
import { ProjectDetailsWidget } from "../../../widgets/project/details";
import { ProjectLogsWidget } from "../../../widgets/project/logs/index";

export function ProjectDetailsPage() {
  useTitle(AppTitles.getProjectTitle());

  return (
    <Layout.Content>
      <ProjectsTableModuleProvider>
        <ProjectDetailsProvider>
          <ProjectLogsTableModuleProvider>
            <ProjectCommentsTableModuleProvider>
              <Splitter>
                <Splitter.Panel resizable={false} defaultSize="50%">
                  <Flex vertical gap={24} className="pr-8">
                    <Typography.Title level={3}>Информация о проекте</Typography.Title>
                    <ProjectDetailsWidget />
                  </Flex>
                </Splitter.Panel>
                <Splitter.Panel resizable={false}>
                  <Flex vertical gap={24} className="pl-8">
                    <Tabs
                      items={[
                        {
                          label: "Комментарии",
                          key: "comments",
                          children: <ProjectCommentsWidget />
                        },
                        {
                          label: "Логи",
                          key: "logs",
                          children: <ProjectLogsWidget />
                        }
                      ]}
                    />
                  </Flex>
                </Splitter.Panel>
              </Splitter>
            </ProjectCommentsTableModuleProvider>
          </ProjectLogsTableModuleProvider>
        </ProjectDetailsProvider>
      </ProjectsTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(ProjectDetailsPage);
