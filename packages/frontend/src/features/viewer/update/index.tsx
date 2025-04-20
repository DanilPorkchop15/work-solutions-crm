import React from "react";
import { useAsyncFn } from "react-use";
import { AntdServices } from "@frontend/shared/model/services";
import { UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";
import { Button, Flex, Form } from "antd";
import { observer } from "mobx-react-lite";

import { pipe } from "ramda";
import { FormErrorMessage } from "@frontend/shared/ui/forms";
import { UserInput, UserView } from "@frontend/entities/@common/user/ui";
import { UpdateViewerFormValues } from "@frontend/features/viewer/update/interfaces";
import { useInjectService } from "@frontend/shared/lib/useInjectService";
import { ViewerUpdateService } from "@frontend/features/viewer/services";
import { User } from "@frontend/entities/@common/user";
import { mapViewerUpdateFormValuesToUpdateUserDto } from "@frontend/features/viewer/update/api";

interface UserUpdateFormProps {
  additionalOnFinish?: () => void | Promise<void>;
  onLoad?: () => void;
}

const SUCCESS_MESSAGE = "Пользователь успешно обновлен";

export const ViewerUpdateFeature = observer(function UserUpdateFeature({
  additionalOnFinish,
  onLoad
}: UserUpdateFormProps) {
  const [editUserForm] = Form.useForm<UpdateViewerFormValues>();

  const updateViewerService: ViewerUpdateService = useInjectService(ViewerUpdateService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const [{ error, loading }, onSubmit] = useAsyncFn(
    async (body: UserUpdateRequestDTO) => {
      const user: User = await updateViewerService.update(body);
      setAvatarUser(user);
      antdServices.notification.success({ message: SUCCESS_MESSAGE });
      void additionalOnFinish?.();
    },
    [additionalOnFinish]
  );

  const isDisabled: boolean = updateViewerService.viewer.deletedAt !== null;

  const [avatarUser, setAvatarUser] = React.useState(updateViewerService.viewer);

  return (
    <Flex vertical justify="space-between" gap={48} className="w-[50%]">
      <UserView.Avatar user={avatarUser} size={250} shape="square" previewable />
      <Form
        autoComplete="off"
        disabled={isDisabled}
        form={editUserForm}
        layout="vertical"
        name="createUser"
        size="middle"
        validateTrigger="onSubmit"
        onFinish={pipe(mapViewerUpdateFormValuesToUpdateUserDto, onSubmit)}
      >
        <UserInput.FullName error={error} initialValue={updateViewerService.viewer.fullName} disabled={isDisabled} />
        <UserInput.Email error={error} initialValue={updateViewerService.viewer.email} disabled={isDisabled} />
        <UserInput.Role error={error} initialValue={updateViewerService.viewer.role} disabled={true} />
        <UserInput.Position
          error={error}
          initialValue={updateViewerService.viewer.position ?? undefined}
          disabled={isDisabled}
        />
        <UserInput.AvatarUrl
          error={error}
          initialValue={updateViewerService.viewer.avatarUrl ?? undefined}
          disabled={isDisabled}
        />
        <FormErrorMessage error={error} />
        {!isDisabled && (
          <Form.Item style={{ textAlign: "right" }}>
            <Button htmlType="submit" loading={loading} type="primary">
              Сохранить
            </Button>
          </Form.Item>
        )}
      </Form>
    </Flex>
  );
});
