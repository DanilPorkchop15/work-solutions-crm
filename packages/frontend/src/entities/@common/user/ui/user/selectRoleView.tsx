import React from "react";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { Select, SelectProps } from "antd";

export const UserRoleSelect = ({ showAdmin, ...props }: SelectProps & { showAdmin?: boolean }) => (
  <Select placeholder="Роль" {...props}>
    <Select.Option key={Role.USER} value={Role.USER}>
      Пользователь
    </Select.Option>
    <Select.Option key={Role.MANAGER} value={Role.MANAGER}>
      Менеджер
    </Select.Option>
    <Select.Option key={Role.MODERATOR} value={Role.MODERATOR}>
      Модератор
    </Select.Option>
    {showAdmin && (
      <Select.Option key={Role.ADMIN} value={Role.ADMIN}>
        Администратор
      </Select.Option>
    )}
  </Select>
);
