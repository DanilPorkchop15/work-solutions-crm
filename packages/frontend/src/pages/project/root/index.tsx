import React from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "react-use";
import { ProjectPreview } from "@frontend/entities/project";
import { Flex, Typography } from "antd";

import { ProjectsTableModuleProvider } from "../../../entities/project/model/table/config";
import { ProjectBulkDeleteFeature } from "../../../features/project/bulk-delete";
import { ProjectBulkRestoreFeature } from "../../../features/project/bulk-restore";
import { ProjectCreateFeature } from "../../../features/project/create";
import { AppTitles } from "../../../shared/model/services/appTitles";
import { useHeader } from "../../../widgets/header/config";
import { ProjectsTableWidget } from "../../../widgets/project/table";

function ProjectsRootPage() {
  useTitle(AppTitles.getProjectsTitle());
  useHeader(<Typography.Title level={2}>Проекты</Typography.Title>);

  return (
    <div className="h-full w-full">
      <ProjectsTableModuleProvider>
        <Flex vertical gap={12}>
          <div>
            <ProjectCreateFeature.Button />
          </div>
          <ProjectsTableWidget
            selectedRowColumnTitleOptions={(projects: ProjectPreview[], onSuccess?: () => Promise<void>) => (
              <Flex gap={5} justify="center">
                <ProjectBulkDeleteFeature.Icon projects={projects} onSuccess={onSuccess} />
                <span>|</span>
                <ProjectBulkRestoreFeature.Icon projects={projects} onSuccess={onSuccess} />
              </Flex>
            )}
          />
        </Flex>
        <Outlet />
      </ProjectsTableModuleProvider>
    </div>
  );
}

export const Component = React.memo(ProjectsRootPage);
