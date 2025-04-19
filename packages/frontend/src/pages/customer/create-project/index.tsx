import React from "react";
import { useParams } from "react-router";
import { ProjectsTableModuleProvider } from "@frontend/entities/project";

import { ProjectCreateFeature } from "../../../features/project/create";

function CreateProjectForCustomerPage() {
  const { id } = useParams();

  return (
    <ProjectsTableModuleProvider>
      <ProjectCreateFeature.Modal customerId={id} />
    </ProjectsTableModuleProvider>
  );
}

export const Component = React.memo(CreateProjectForCustomerPage);
