import { isNil } from "ramda";

import { useInjectService } from "../../../../../shared/lib/useInjectService";
import type { Project } from "../../../interfaces";

import { ProjectDetailsService } from "./service";

export function useProjectDetails(): Project {
  const projectDetails: Project | null = useInjectService(ProjectDetailsService).projectDetails;

  if (isNil(projectDetails)) throw new Error("ProjectDetails not found");

  return projectDetails;
}
