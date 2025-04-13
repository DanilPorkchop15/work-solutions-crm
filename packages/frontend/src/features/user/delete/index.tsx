import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { User } from "@frontend/entities/@common/user";
import { AccessCheck } from "@frontend/entities/viewer";
import { AntdServices } from "@frontend/shared/model/services";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { UserService } from "../services/UserService";

interface UserDeleteFeatureProps extends ButtonProps {
  user: User;
  disabled?: boolean;
  onSuccess?: () => void | Promise<void>;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Пользователь успешно архивирован";

const UserDeleteFeatureBase = React.memo(function ArchiveTariffFeature({
  user,
  disabled,
  onSuccess,
  children,
  ...props
}: UserDeleteFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const userService: UserService = useInjectService(UserService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const userDeleteFn: () => Promise<void> = async () => {
    await userService.delete(user.id);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Архивировать"
        subtitle={
          <Typography.Text>
            Вы уверены, что хотите архивировать пользователя —{" "}
            <Typography.Text type="danger">{user.fullName}</Typography.Text>
          </Typography.Text>
        }
        title="Архивировать пользователя"
      />
      <AccessCheck type="disable" action={Action.DELETE} subject={Subject.USERS}>
        <Button danger disabled={disabled} onClick={withConfirmation(userDeleteFn)} {...props}>
          {children}
        </Button>
      </AccessCheck>
    </>
  );
});

const UserDeleteButton = React.memo(function UserDeleteButton(props: UserDeleteFeatureProps) {
  return (
    <UserDeleteFeatureBase type="primary" {...props}>
      {props.user.deletedAt ? "Архивный пользователь" : "Архивировать"}
    </UserDeleteFeatureBase>
  );
});

const UserDeleteIcon = React.memo(function UserDeleteIcon(props: UserDeleteFeatureProps) {
  return (
    <Tooltip title={props.user.deletedAt ? "Архивный пользователь" : "Архивировать "}>
      <UserDeleteFeatureBase icon={<DeleteFilled style={{ fontSize: 18 }} />} size="small" type="link" {...props} />
    </Tooltip>
  );
});

export const UserDeleteFeature = {
  Icon: UserDeleteIcon,
  Button: UserDeleteButton
};
