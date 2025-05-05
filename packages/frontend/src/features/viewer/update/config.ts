import { UserCreateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";

import { ValidationRules } from "../../../shared/lib/types";

export const validationRules: ValidationRules<UserCreateRequestDTO> = {
  first_name: [{ required: true, message: "Пожалуйста, введите ваше имя" }],
  email: [
    {
      type: "email",
      message: "Ввод не является действительным E-mail!"
    },
    { required: true, message: "Пожалуйста, введите ваш e-mail" }
  ],
  password: [{ required: true, message: "Пожалуйста, введите ваш пароль", min: 8 }],
  role: [{ required: true, message: "Пожалуйста, выберите роль" }],
  position: [{ required: false, message: "Пожалуйста, введите вашу должность" }],
  avatar_url: [{ required: false, message: "Пожалуйста, выберите аватар", type: "url" }]
};
