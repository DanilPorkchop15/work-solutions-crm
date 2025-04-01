import React from "react";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { Form, Input, Select } from "antd";

import { validationRules } from "../config";

interface UserTitleProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

const UserFullNameInput = ({ initialValue, error, disabled }: UserTitleProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Имя"
    name="fullName"
    rules={validationRules.fullName}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="Имя" disabled={disabled} />
  </Form.Item>
);

interface UserEmailProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

const UserEmailInput = ({ initialValue, error, disabled }: UserEmailProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Email"
    name="email"
    rules={validationRules.email}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="Email" disabled={disabled} />
  </Form.Item>
);

interface UserPasswordProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

const UserPasswordInput = ({ initialValue, error, disabled }: UserPasswordProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Пароль"
    name="password"
    rules={validationRules.password}
    validateStatus={error ? "error" : undefined}
  >
    <Input.Password maxLength={100} placeholder="Пароль" disabled={disabled} />
  </Form.Item>
);

interface UserPositionProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

const UserPositionInput = ({ initialValue, error, disabled }: UserPositionProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Должность"
    name="position"
    rules={validationRules.position}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="Должность" disabled={disabled} />
  </Form.Item>
);

interface UserAvatarUrlProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

const UserAvatarUrlInput = ({ initialValue, error, disabled }: UserAvatarUrlProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Ссылка на аватар"
    name="avatarUrl"
    rules={validationRules.avatarUrl}
    validateStatus={error ? "error" : undefined}
  >
    <Input placeholder="Ссылка на аватар" disabled={disabled} className={disabled ? "bg-black" : ""} />
  </Form.Item>
);

interface UserRolesProps {
  initialValue?: Role;
  error?: Error;
  disabled?: boolean;
}

const UserRoleInput = ({ initialValue, error, disabled }: UserRolesProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Роль"
    name="role"
    rules={validationRules.role}
    validateStatus={error ? "error" : undefined}
  >
    <Select placeholder="Роль" disabled={disabled}>
      <Select.Option value={Role.ADMIN}>Администратор</Select.Option>
      <Select.Option value={Role.USER}>Пользователь</Select.Option>
      <Select.Option value={Role.MANAGER}>Менеджер</Select.Option>
    </Select>
  </Form.Item>
);

export const UserInput = {
  FullName: UserFullNameInput,
  Email: UserEmailInput,
  Password: UserPasswordInput,
  Position: UserPositionInput,
  AvatarUrl: UserAvatarUrlInput,
  Role: UserRoleInput
};
