import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { AntdServices } from "@frontend/shared/model/services";
import { UserCreateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";
import { Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { assoc, pipe } from "ramda";

import { useInjectService } from "../../../../shared/lib/useInjectService";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";
import { UserService } from "../../services/UserService";
import { mapUserCreateFormValuesToCreateUserDto } from "../api";
import { UserCreateFormValues } from "../interfaces";

import { UserInput } from "./UserInput";
import { CreationModal } from "@frontend/shared/ui/creationModal";
import { FormErrorMessage } from "@frontend/shared/ui/forms";
import { useUsersTableModule } from "@frontend/entities/@common/user";

const SUCCESS_MESSAGE = "Пользователь успешно создан";

export const UserCreateModal = observer(function CreateUserModal() {
  const userService: UserService = useInjectService(UserService);
  const antdServices: AntdServices = useInjectService(AntdServices);

  const userTableModule = useUsersTableModule();

  const [createUserForm] = Form.useForm<UserCreateFormValues>();

  const navigate: NavigateFunction = useNavigate();

  const cancel: () => void = () => {
    navigate(AppRoutes.getUsersUrl(true));
  };

  const [{ loading, error }, onSubmit] = useAsyncFn(async (body: UserCreateRequestDTO) => {
    await userService.create(body);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    await userTableModule.load();
    cancel();
  });

  return (
    <CreationModal title="Добавление пользователя" onCancel={cancel}>
      <Form
        autoComplete="off"
        form={createUserForm}
        layout="vertical"
        name="createUser"
        size="middle"
        validateTrigger="onSubmit"
        onFinish={pipe(mapUserCreateFormValuesToCreateUserDto, onSubmit)}
      >
        <UserInput.FullName error={error} />
        <UserInput.Email error={error} />
        <UserInput.Role error={error} />
        <UserInput.Password error={error} />
        <UserInput.Position error={error} />
        <UserInput.AvatarUrl error={error} />
        <FormErrorMessage error={error} />
        <Form.Item style={{ textAlign: "right" }}>
          <Button style={{ marginRight: 8 }} onClick={cancel}>
            Отмена
          </Button>
          <Button htmlType="submit" loading={loading} type="primary">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </CreationModal>
  );
});
