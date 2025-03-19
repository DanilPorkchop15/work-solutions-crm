/* eslint-disable @typescript-eslint/naming-convention */
import { identity, memoizeWith } from "ramda";

const errorTranslationMap: Record<string, string> = {
  "Invalid identifier or password": "Неверный логин или пароль",
  Forbidden: "Недостаточно прав для действия",
  "Your account has been blocked by an administrator": "Аккаунт заблокирован",
  "An application error occured": "Произошла ошибка в приложении",
  "Internal server error": "Произошла ошибка в приложении",
  "Email address does not exist": "Несуществующий адрес электронной почты",
  "Link has already been used": "Ссылка уже использована",
  "The provided current password is invalid": "Неправильный текущий пароль",
  "Email already taken": "Email уже занят",
  "This attribute must be unique": "Поле username должно быть уникальным",
  "Your new password must be different than your current password": "Новый пароль не должен совпадать со старым"
};

export const translateError: (message: string) => string = memoizeWith(identity, (message: string) => {
  const messageTranslation: string = errorTranslationMap[message];
  if (!messageTranslation) {
    return "Что-то пошло не так";
  }
  return messageTranslation;
});
