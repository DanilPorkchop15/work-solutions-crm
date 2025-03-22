import { isNil } from "ramda";

import { useInjectService } from "../../shared/lib/useInjectService";

import type { ViewerModel } from "./model";
import { ViewerService } from "./service";

export function useViewer(): ViewerModel {
  const viewerService: ViewerService = useInjectService(ViewerService);

  const viewer: ViewerModel | null = viewerService.viewer;

  if (isNil(viewer)) throw new Error("Viewer not found");

  return viewer;
}
