import {
  DocumentCreateRequestDTO,
  DocumentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/document/document.api";

import { DocumentCreateFormValues, DocumentUpdateFormValues } from "../interfaces";

export const mapDocumentCreateFormValuesToCreateDto = (values: DocumentCreateFormValues): DocumentCreateRequestDTO => ({
  name: values.name,
  description: values.description,
  document_url: values.document_url,
  roles: values.roles
});

export const mapDocumentUpdateFormValuesToUpdateDto = (values: DocumentUpdateFormValues): DocumentUpdateRequestDTO => ({
  name: values.name,
  description: values.description,
  document_url: values.document_url,
  roles: values.roles
});
