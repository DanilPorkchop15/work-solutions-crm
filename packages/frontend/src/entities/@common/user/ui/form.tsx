import type React from "react";
import { Button, Col, Form, type FormProps, Input, Row, Select, Switch, Typography } from "antd";

import { type CreateUserDto, type UpdateUserDto, UserRole } from "entities/@common/user";

import { translateError } from "shared/api";
import type { ValidationRules } from "shared/lib/types";
import { Uploader, type UploaderProps } from "shared/ui/upload";

interface UserFormView<Values extends CreateUserDto | UpdateUserDto> {
  validationRules: ValidationRules<Values>;
  submitText: string;
  loading: boolean;
  submitDisabled?: boolean;
  form?: FormProps<Values>["form"];
  error?: Error;
  initialValues?: FormProps<Values>["initialValues"];
  uploaderInitialState?: UploaderProps["Single"]["initialState"];
  onFinish: FormProps<Values>["onFinish"];
  beforeAvatarUpload: UploaderProps["Single"]["beforeUpload"];
  onAvatarRemove: UploaderProps["Single"]["onRemove"];
}

export function UserFormView<Values extends CreateUserDto | UpdateUserDto>({
  validationRules,
  submitText,
  loading,
  submitDisabled,
  form,
  error,
  initialValues,
  uploaderInitialState,
  onFinish,
  beforeAvatarUpload,
  onAvatarRemove,
}: UserFormView<Values>): React.JSX.Element {
  return (
    <Form<Values>
      autoComplete="off"
      className="flex flex-col justify-between h-0 flex-1 w-full mt-4"
      form={form}
      initialValues={initialValues}
      layout="vertical"
      name="createUserForm"
      onFinish={onFinish}
    >
      <Row className="w-full">
        <Col className="min-w-80 w-2/6 mr-40">
          <Form.Item>
            <Typography.Title level={5}>Данные для входа</Typography.Title>
          </Form.Item>
          <Form.Item label="Email" name="email" rules={validationRules.email}>
            <Input size="middle" status={error && "error"} />
          </Form.Item>
          <Form.Item label="Пароль" name="password" rules={validationRules.password}>
            <Input.Password autoComplete="new-password" size="middle" status={error && "error"} />
          </Form.Item>

          <Form.Item>
            <Typography.Title level={5}>Личная информация</Typography.Title>
          </Form.Item>
          <Form.Item label="Имя" name="firstName" rules={validationRules.firstName}>
            <Input size="middle" status={error && "error"} />
          </Form.Item>
          <Form.Item label="Фамилия" name="lastName" rules={validationRules.lastName}>
            <Input size="middle" status={error && "error"} />
          </Form.Item>
        </Col>

        <Col className="min-w-60 w-1/5">
          <Form.Item>
            <Typography.Title level={5}>Настройки профиля</Typography.Title>
          </Form.Item>
          <Form.Item initialValue={false} label="blocked" name="blocked" rules={validationRules.blocked}>
            <Switch />
          </Form.Item>
          <Form.Item initialValue={UserRole.Student} label="Роль" name="role" rules={validationRules.role}>
            <Select>
              <Select.Option value={UserRole.Student}>{UserRole.Student}</Select.Option>
              <Select.Option value={UserRole.Admin}>{UserRole.Admin}</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Фото профиля">
            <Uploader.Single
              beforeUpload={beforeAvatarUpload}
              className="mt-4"
              initialState={uploaderInitialState}
              onRemove={onAvatarRemove}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row className="items-center">
        <Button
          ghost
          className="w-fit mr-4"
          disabled={submitDisabled}
          htmlType="submit"
          loading={loading}
          shape="round"
          size="middle"
          type="primary"
        >
          {submitText}
        </Button>
        {error && (
          <Typography.Text className="block text-left" type="danger">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any,
             @typescript-eslint/no-unsafe-argument */}
            {translateError((error as any).axiosError?.response?.data?.error?.message ?? error.message)}
          </Typography.Text>
        )}
      </Row>
    </Form>
  );
}
