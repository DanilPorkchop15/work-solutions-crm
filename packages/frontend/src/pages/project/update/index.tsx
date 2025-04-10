import React from "react";
import { ProjectDetailsProvider } from "@frontend/entities/project/model";

import { ProjectUpdateFeature } from "../../../features/project/update";

function ProjectUpdatePage() {
  return (
    <ProjectDetailsProvider>
      <ProjectUpdateFeature.Modal />
    </ProjectDetailsProvider>
  );
}

export const Component = React.memo(ProjectUpdatePage);
