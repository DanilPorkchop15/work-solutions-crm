import React from "react";
import { useParams } from "react-router";
import { container } from "tsyringe";

import { ProjectCommentsTableModule } from "./model";

const Context = React.createContext<ProjectCommentsTableModule | null>(null);

export const ProjectCommentsTableModuleProvider = React.memo(function ProjectCommentsTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const module: ProjectCommentsTableModule = React.useMemo(() => container.resolve(ProjectCommentsTableModule), []);
  return <Context.Provider value={module}>{children}</Context.Provider>;
});

export function useProjectCommentsTableModule(): ProjectCommentsTableModule {
  const module: ProjectCommentsTableModule | null = React.useContext(Context);
  const { id } = useParams();
  if (!module) throw new Error("ProjectCommentsTableModule not found");
  if (!id) throw new Error("ProjectId not found");
  module.pathParams.set("projectId", id);
  return module;
}
