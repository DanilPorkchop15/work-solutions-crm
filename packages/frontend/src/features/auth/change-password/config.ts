import { ValidationRules } from "@frontend/shared/lib/types";
import { AuthChangePasswordRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";

export const validationRules: ValidationRules<AuthChangePasswordRequestDTO & { confirm_password: string }> = {
  old_password: [{ required: true, message: "Пожалуйста, введите ваш пароль" }],
  new_password: [
    { required: true, message: "Пожалуйста, введите новый пароль" },
    { min: 8, message: "Минимальная длина пароля 8 символов" }
  ],
  confirm_password: [
    { required: true, message: "Пожалуйста, подтвердите новый пароль" },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("new_password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Пароли не совпадают"));
      }
    })
  ]
};
