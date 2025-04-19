import { CustomerCreateRequestDTO } from "@work-solutions-crm/libs/shared/customer/customer.api";

import { ValidationRules } from "../../../../../shared/lib/types";

export const validationRules: ValidationRules<CustomerCreateRequestDTO> = {
  name: [{ required: true, message: "Пожалуйста, введите название организации" }],
  email: [
    {
      type: "email",
      message: "Ввод не является действительным E-mail!"
    },
    { required: true, message: "Пожалуйста, введите ваш e-mail" }
  ],
  inn: [
    { required: false, message: "Пожалуйста, введите ваш ИНН" },
    { min: 10, max: 12, message: "Пожалуйста, введите корректный ИНН" }
  ],
  phone: [{ required: false, message: "Пожалуйста, введите ваш телефон" }],
  website: [{ required: false, message: "Пожалуйста, введите ваш сайт", type: "url" }]
};
