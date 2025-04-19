import React, { memo, useState } from "react";
import { useNavigate } from "react-router";
import { NavigateFunction } from "react-router-dom";
import { KeyOutlined } from "@ant-design/icons";
import { AccessCheck } from "@frontend/entities/viewer";
import { validationRules } from "@frontend/features/auth/change-password/config";
import { useInjectService } from "@frontend/shared/lib/useInjectService";
import { AntdServices, AppRoutes } from "@frontend/shared/model/services";
import { AuthChangePasswordRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Button, ButtonProps, Form, Input, Modal, Tooltip } from "antd";

import { AuthService } from "../service";

const ChangePasswordModal = memo(function ChangePasswordModal() {
  const navigate: NavigateFunction = useNavigate();
  const [form] = Form.useForm();
  const authService: AuthService = useInjectService(AuthService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const onFinish = async (values: AuthChangePasswordRequestDTO) => {
    try {
      await authService.changePassword(values);
      navigate(AppRoutes.getProfileUrl(true));
      void antdServices.message.success("Пароль успешно изменен");
    } catch (error) {
      void antdServices.message.error((error as Error).message);
    } finally {
      form.resetFields();
    }
  };

  return (
    <Modal title="Изменить пароль" open onCancel={() => navigate(AppRoutes.getProfileUrl(true))} footer={null}>
      <Form form={form} name="change-password" onFinish={onFinish} layout="vertical">
        <Form.Item label="Старый пароль" name="old_password" rules={validationRules.old_password}>
          <Input.Password placeholder="Старый пароль" />
        </Form.Item>
        <Form.Item label="Новый пароль" name="new_password" rules={validationRules.new_password}>
          <Input.Password placeholder="Новый пароль" />
        </Form.Item>
        <Form.Item
          label="Подтвердите новый пароль"
          name="confirm_password"
          dependencies={["new_password"]}
          rules={validationRules.confirm_password}
        >
          <Input.Password placeholder="Подтвердите новый пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Изменить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
});

const ChangePasswordButton = memo(function ChangePasswordButton(props: ButtonProps) {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate(AppRoutes.getChangePasswordUrl(true), { relative: "path" });
      }}
      type="primary"
      size="small"
      {...props}
    >
      Изменить пароль
    </Button>
  );
});

export const ChangePasswordFeature = {
  Button: ChangePasswordButton,
  Modal: ChangePasswordModal
};
