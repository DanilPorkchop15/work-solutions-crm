import { isNil } from "ramda";

import { useInjectService } from "../../../../../shared/lib/useInjectService";
import type { Document } from "../../../interfaces";

import { DocumentDetailsService } from "./service";

export function useDocumentDetails(): Document {
  const documentDetails: Document | null = useInjectService(DocumentDetailsService).documentDetails;

  if (isNil(documentDetails)) throw new Error("DocumentDetails not found");

  return documentDetails;
}
