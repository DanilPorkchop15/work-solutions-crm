import React, { useState } from "react";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { UsersApi } from "@frontend/entities/@common/user";
import { AntdServices } from "@frontend/shared/model/services";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { Avatar, Button, Flex, Form, Input, Select, SelectProps, Spin, Upload, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";

import { BASE_API_HOST } from "../../../../../../shared/config/const";
import { useInjectService } from "../../../../../../shared/lib/useInjectService";

import { validationRules } from "./config";

interface UserTitleProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

const UserFirstNameInput = ({ initialValue, error, disabled }: UserTitleProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Имя"
    name="first_name"
    rules={validationRules.first_name}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="Имя" disabled={disabled} />
  </Form.Item>
);

const UserLastNameInput = ({ initialValue, error, disabled }: UserTitleProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Фамилия"
    name="last_name"
    rules={validationRules.last_name}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="Фамилия" disabled={disabled} />
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

const UserAvatarUrlInput = ({ initialValue, error, disabled }: UserAvatarUrlProps) => {
  const usersApi: UsersApi = useInjectService(UsersApi);
  const form = Form.useFormInstance();
  const antdServices: AntdServices = useInjectService(AntdServices);

  const [loading, setLoading] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(initialValue);

  const handleUpload = async (file: RcFile) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await usersApi.uploadAvatar({ body: formData });
      const fullUrl = `${BASE_API_HOST}/${response}`;

      form.setFieldsValue({ avatar_url: fullUrl });
      setCurrentAvatar(fullUrl);

      void antdServices.message.success("Аватар успешно загружен");
    } catch (err) {
      void antdServices.message.error("Не удалось загрузить аватар");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const customRequest: UploadProps["customRequest"] = async ({ file, onSuccess, onError }) => {
    try {
      await handleUpload(file as RcFile);
      onSuccess?.("Upload successful");
    } catch (err) {
      onError?.(err as Error);
    }
  };

  return (
    <Form.Item
      initialValue={initialValue}
      label="Аватарка"
      name="avatar_url"
      rules={validationRules.avatar_url}
      validateStatus={error ? "error" : undefined}
      getValueFromEvent={e => currentAvatar}
    >
      <Flex gap={8} align="center">
        <Upload
          name="avatar"
          showUploadList={false}
          disabled={disabled ?? loading}
          beforeUpload={file => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
              antdServices.message.error("Можно загружать только изображения!");
              return Upload.LIST_IGNORE;
            }

            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
              antdServices.message.error("Изображение должно быть меньше 5MB!");
              return Upload.LIST_IGNORE;
            }

            return true;
          }}
          customRequest={customRequest}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />} disabled={disabled || loading}>
            {loading ? <Spin size="small" /> : "Загрузить"}
          </Button>
        </Upload>

        <Input placeholder="Ссылка на аватарку" readOnly style={{ flex: 1 }} value={currentAvatar} />

        <Avatar size="large" src={currentAvatar} icon={<UserOutlined />} />
      </Flex>
    </Form.Item>
  );
};

interface UserRolesProps {
  initialValue?: Role;
  error?: Error;
  disabled?: boolean;
}

const UserRoleInput = ({ initialValue, error, disabled, ...props }: UserRolesProps & SelectProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Роль"
    name="role"
    rules={validationRules.role}
    validateStatus={error ? "error" : undefined}
  >
    <Select placeholder="Роль" disabled={disabled} {...props}>
      <Select.Option value={Role.USER}>Пользователь</Select.Option>
      <Select.Option value={Role.MANAGER}>Менеджер</Select.Option>
      <Select.Option value={Role.MODERATOR}>Модератор</Select.Option>
      <Select.Option value={Role.ADMIN}>Администратор</Select.Option>
    </Select>
  </Form.Item>
);

export const UserInput = {
  FirstName: UserFirstNameInput,
  LastName: UserLastNameInput,
  Email: UserEmailInput,
  Password: UserPasswordInput,
  Position: UserPositionInput,
  AvatarUrl: UserAvatarUrlInput,
  Role: UserRoleInput
};
