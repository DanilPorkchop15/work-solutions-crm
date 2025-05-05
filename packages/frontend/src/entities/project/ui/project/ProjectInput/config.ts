import { ProjectCreateRequestDTO } from "@work-solutions-crm/libs/shared/project/project.api";
import { ProjectStatus } from "@work-solutions-crm/libs/shared/project/project.dto";
import { RuleObject } from "antd/es/form";

import { ValidationRules } from "../../../../../shared/lib/types";

export const validationRules: ValidationRules<ProjectCreateRequestDTO> = {
  name: [
    { required: true, message: "Введите название проекта" },
    { max: 100, message: "Максимальная длина 100 символов" }
  ],
  description: [{ max: 500, message: "Максимальная длина 500 символов" }],
  start_date: [{ required: true, message: "Укажите дату начала" }],
  end_date: [
    { required: true, message: "Укажите дату окончания" },
    ({ getFieldValue }: { getFieldValue: (name: string) => any }): RuleObject => ({
      validator(_, value) {
        if (!value || !getFieldValue("startDate") || new Date(value) >= new Date(getFieldValue("startDate"))) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Дата окончания должна быть позже даты начала"));
      }
    })
  ],
  customer_id: [{ required: true, message: "Выберите клиента" }],
  users_accountable: [{ required: true, message: "Выберите ответственных" }],
  status: [
    { required: true, message: "Выберите статус" },
    { type: "enum", enum: Object.values(ProjectStatus) }
  ],
  budget: [{ type: "number", message: "Введите бюджет в числовом формате", required: true }]
};
