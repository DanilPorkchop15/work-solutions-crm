import React from "react";
import { isNil } from "ramda";
import { container } from "tsyringe";

import { ProjectsTableModule } from "./model";

const Context: React.Context<ProjectsTableModule | null> = React.createContext<ProjectsTableModule | null>(null);

export const ProjectsTableModuleProvider = React.memo(function ProjectsTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const projectsTableModule: ProjectsTableModule = React.useMemo(() => container.resolve(ProjectsTableModule), []);

  return <Context.Provider value={projectsTableModule}>{children}</Context.Provider>;
});

export function useProjectsTableModule(): ProjectsTableModule {
  const projectsTableModule: ProjectsTableModule | null = React.useContext(Context);

  if (isNil(projectsTableModule)) {
    throw new Error("ProjectsTableModule not found");
  }

  return projectsTableModule;
}
