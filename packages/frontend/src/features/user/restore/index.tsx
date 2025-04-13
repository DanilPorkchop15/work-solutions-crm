import React from "react";
import { RedoOutlined } from "@ant-design/icons";
import { User } from "@frontend/entities/@common/user";
import { AccessCheck } from "@frontend/entities/viewer";
import { AntdServices } from "@frontend/shared/model/services";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { UserService } from "../services/UserService";

interface UserRestoreFeatureProps extends ButtonProps {
  user: User;
  disabled?: boolean;
  onSuccess?: () => void | Promise<void>;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Пользователь успешно восстановлен";

const UserRestoreFeatureBase = React.memo(function RestoreTariffFeature({
  user,
  disabled,
  onSuccess,
  children,
  ...props
}: UserRestoreFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const userService: UserService = useInjectService(UserService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const userRestoreFn: () => Promise<void> = async () => {
    await userService.restore(user.id);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Восстановить"
        subtitle={
          <Typography.Text>
            Вы уверены, что хотите восстановить пользователя —{" "}
            <Typography.Text type="danger">{user.fullName}</Typography.Text>
          </Typography.Text>
        }
        title="Восстановить пользователя"
      />
      <AccessCheck type="disable" action={Action.UPDATE} subject={Subject.USERS}>
        <Button disabled={disabled} onClick={withConfirmation(userRestoreFn)} {...props}>
          {children}
        </Button>
      </AccessCheck>
    </>
  );
});

const UserRestoreButton = React.memo(function UserRestoreButton(props: UserRestoreFeatureProps) {
  return (
    <UserRestoreFeatureBase type="primary" {...props}>
      {props.user.deletedAt ? "Восстановить" : "Архивировать"}
    </UserRestoreFeatureBase>
  );
});

const UserRestoreIcon = React.memo(function UserRestoreIcon(props: UserRestoreFeatureProps) {
  return (
    <Tooltip title="Восстановить">
      <UserRestoreFeatureBase icon={<RedoOutlined />} size="small" type="primary" shape="circle" {...props} />
    </Tooltip>
  );
});

export const UserRestoreFeature = {
  Icon: UserRestoreIcon,
  Button: UserRestoreButton
};
