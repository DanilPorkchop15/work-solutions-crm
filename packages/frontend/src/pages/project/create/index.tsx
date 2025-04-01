import React from "react";

import { ProjectCreateFeature } from "../../../features/project/create";

function ProjectCreatePage() {
  return <ProjectCreateFeature.Modal />;
}

export const Component = React.memo(ProjectCreatePage);
