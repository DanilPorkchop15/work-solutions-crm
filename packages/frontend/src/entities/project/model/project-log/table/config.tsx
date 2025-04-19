import React from "react";
import { useParams } from "react-router";
import { container } from "tsyringe";

import { ProjectLogsTableModule } from "./model";

const Context = React.createContext<ProjectLogsTableModule | null>(null);

export const ProjectLogsTableModuleProvider = React.memo(function ProjectLogsTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const module: ProjectLogsTableModule = React.useMemo(() => container.resolve(ProjectLogsTableModule), []);
  return <Context.Provider value={module}>{children}</Context.Provider>;
});

export function useProjectLogsTableModule(): ProjectLogsTableModule {
  const module: ProjectLogsTableModule | null = React.useContext(Context);
  const { id } = useParams();
  if (!module) throw new Error("ProjectLogsTableModule not found");
  if (!id) throw new Error("ProjectId not found");
  module.pathParams.set("projectId", id);
  return module;
} 