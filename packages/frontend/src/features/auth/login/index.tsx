import React from "react";
import { useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { Button, Form, Input, theme, Typography } from "antd";

import { validationRules } from "./config";
import { AppRoutes } from "@frontend/shared/model/services";
import { useInjectService } from "@frontend/shared/lib/useInjectService";
import { AuthService } from "../service";
import { translateError } from "@frontend/shared/api";
import { LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";

export const LoginFeature = React.memo(function LoginForm() {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const authService: AuthService = useInjectService(AuthService);

  const [{ error, loading }, submitForm] = useAsyncFn(async (body: LoginRequestDTO) => {
    await authService.login(body);
    navigate(AppRoutes.getRootUrl());
  });

  return (
    <div className="w-full h-full flex justify-center flex-col">
      <Typography.Title level={3}>Work Solutions</Typography.Title>
      <Typography.Text>WS-CRM Управление проектами</Typography.Text>
      <Form
        autoComplete="off"
        className="w-full"
        name="basic"
        size="large"
        style={{ marginTop: token.marginXL }}
        onFinish={submitForm}
      >
        <Form.Item name="email" rules={validationRules.email}>
          <Input placeholder="E-mail" status={error && "error"} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={validationRules.password}
          style={{ marginBottom: error ? token.marginXS : token.marginLG }}
        >
          <Input.Password placeholder="Пароль" status={error && "error"} />
        </Form.Item>

        {error && (
          <Typography.Text
            className="block text-left"
            style={{ color: token.colorErrorText, marginBottom: token.marginXS }}
          >
            {translateError((error as any)?.axiosError?.response?.data?.error?.message ?? error.message)}
          </Typography.Text>
        )}

        <Button block htmlType="submit" loading={loading} style={{ marginBottom: token.marginXS }} type="primary">
          Войти
        </Button>
      </Form>
    </div>
  );
});
