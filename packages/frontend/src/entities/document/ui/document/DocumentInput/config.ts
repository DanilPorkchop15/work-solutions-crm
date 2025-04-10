import { DocumentCreateRequestDTO } from "@work-solutions-crm/libs/shared/document/document.api";

import { ValidationRules } from "../../../../../shared/lib/types";

export const validationRules: ValidationRules<DocumentCreateRequestDTO> = {
  name: [{ required: true, message: "Пожалуйста, введите название документа" }],
  description: [{ required: false, message: "Пожалуйста, введите описание документа" }],
  roles: [{ required: true, message: "Пожалуйста, выберите роли" }]
};
