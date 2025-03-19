import { isNil } from "ramda";

import type { ViewerModel } from "./model";
import { viewerService } from "./service";

export function useViewer(): ViewerModel {
  const viewer: ViewerModel | null = viewerService.viewer;

  if (isNil(viewer)) throw new Error("Viewer not found");

  return viewer;
}
