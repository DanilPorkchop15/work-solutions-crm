import React from "react";
import { useTitle } from "react-use";
import { ProjectDetailsProvider, ProjectsTableModuleProvider } from "@frontend/entities/project/model";

import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout";
import { ProjectDetailsWidget } from "../../../widgets/project/details";

export function ProjectDetailsPage() {
  useTitle(AppTitles.getProjectTitle());

  return (
    <Layout.Content>
      <ProjectsTableModuleProvider>
        <ProjectDetailsProvider>
          <ProjectDetailsWidget />
        </ProjectDetailsProvider>
      </ProjectsTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(ProjectDetailsPage);
