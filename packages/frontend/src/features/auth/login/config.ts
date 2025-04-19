import { LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";

import { ValidationRules } from "../../../shared/lib/types";

export const validationRules: ValidationRules<LoginRequestDTO> = {
  email: [
    {
      type: "email",
      message: "Ввод не является действительным E-mail!"
    },
    { required: true, message: "Пожалуйста, введите ваш e-mail" }
  ],
  password: [{ required: true, message: "Пожалуйста, введите ваш пароль" }]
};
