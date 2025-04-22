import React from "react";
import {
  ProjectDetailsProvider,
  ProjectLogsTableModuleProvider,
  ProjectsTableModuleProvider
} from "@frontend/entities/project/model";

import { ProjectUpdateFeature } from "../../../features/project/update";

function ProjectUpdatePage() {
  return (
    <ProjectLogsTableModuleProvider>
      <ProjectsTableModuleProvider>
        <ProjectDetailsProvider>
          <ProjectUpdateFeature.Modal />
        </ProjectDetailsProvider>
      </ProjectsTableModuleProvider>
    </ProjectLogsTableModuleProvider>
  );
}

export const Component = React.memo(ProjectUpdatePage);
