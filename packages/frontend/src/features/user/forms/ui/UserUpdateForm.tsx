import React from "react";
import { useAsyncFn } from "react-use";
import { useUsersTableModule } from "@frontend/entities/@common/user";
import { AccessCheck } from "@frontend/entities/viewer";
import { mapUserUpdateFormValuesToUpdateUserDto } from "@frontend/features/user/forms/api";
import { AntdServices } from "@frontend/shared/model/services";
import { FormErrorMessage } from "@frontend/shared/ui/forms";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";
import { Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { pipe } from "ramda";

import { UserInput } from "../../../../entities/@common/user/ui/UserInput";
import { useInjectService } from "../../../../shared/lib/useInjectService";
import { UserUpdateService } from "../../services/UserUpdateService";
import { UserUpdateFormValues } from "../interfaces";

interface UserUpdateFormProps {
  additionalOnFinish?: () => void | Promise<void>;
  onLoad?: () => void;
}

const SUCCESS_MESSAGE = "Пользователь успешно обновлен";

export const UserUpdateForm = observer(function UserUpdateFeature({ additionalOnFinish, onLoad }: UserUpdateFormProps) {
  const [editUserForm] = Form.useForm<UserUpdateFormValues>();

  const usersTableModule = useUsersTableModule();

  const updateUserService: UserUpdateService = useInjectService(UserUpdateService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const [{ error, loading }, onSubmit] = useAsyncFn(
    async (body: UserUpdateRequestDTO) => {
      await updateUserService.update(body);
      await usersTableModule.load();
      antdServices.notification.success({ message: SUCCESS_MESSAGE });
      void additionalOnFinish?.();
    },
    [additionalOnFinish]
  );

  const isDisabled: boolean = updateUserService.userDetails.deletedAt !== null;

  return (
    <Form
      autoComplete="off"
      disabled={isDisabled}
      form={editUserForm}
      layout="vertical"
      name="createUser"
      size="middle"
      validateTrigger="onSubmit"
      onFinish={pipe(mapUserUpdateFormValuesToUpdateUserDto, onSubmit)}
    >
      <UserInput.FullName error={error} initialValue={updateUserService.userDetails.fullName} disabled={isDisabled} />
      <UserInput.Email error={error} initialValue={updateUserService.userDetails.email} disabled={isDisabled} />
      <UserInput.Role error={error} initialValue={updateUserService.userDetails.role} disabled={true} />
      <UserInput.Position
        error={error}
        initialValue={updateUserService.userDetails.position ?? undefined}
        disabled={isDisabled}
      />
      <UserInput.AvatarUrl
        error={error}
        initialValue={updateUserService.userDetails.avatarUrl ?? undefined}
        disabled={isDisabled}
      />
      <FormErrorMessage error={error} />
      {!isDisabled && (
        <Form.Item style={{ textAlign: "right" }}>
          <AccessCheck type="disable" action={Action.UPDATE} subject={Subject.USERS}>
            <Button htmlType="submit" loading={loading} type="primary">
              Сохранить
            </Button>
          </AccessCheck>
        </Form.Item>
      )}
    </Form>
  );
});
