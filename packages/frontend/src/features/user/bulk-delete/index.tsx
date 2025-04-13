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

interface UserBulkDeleteFeatureProps {
  users: User[];
  disabled?: boolean;
  onSuccess?: () => void;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Выбранные пользователи успешно удалены";

const UserBulkDeleteFeatureBase = React.memo(function BulkDeleteUsersFeature({
  users,
  disabled,
  onSuccess,
  children,
  ...props
}: UserBulkDeleteFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const userService: UserService = useInjectService(UserService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const userBulkDeleteFn: () => Promise<void> = async () => {
    await userService.bulkDelete(users.map(user => user.id));
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Архивировать"
        subtitle={<Typography.Text>Вы уверены, что хотите архивировать {users.length} пользователей?</Typography.Text>}
        title="Архивировать пользователей"
      />
      <AccessCheck type="disable" action={Action.DELETE} subject={Subject.USERS}>
        <Button
          danger
          disabled={disabled ?? (users.length === 0 || users.some(u => u.deletedAt !== null))}
          onClick={withConfirmation(userBulkDeleteFn)}
          {...props}
        >
          {children}
        </Button>
      </AccessCheck>
    </>
  );
});

const UserBulkDeleteButton = React.memo(function UserBulkDeleteButton(props: UserBulkDeleteFeatureProps) {
  return (
    <UserBulkDeleteFeatureBase type="primary" {...props}>
      {props.users.length > 0 ? "Архивировать" : "Выберите пользователей"}
    </UserBulkDeleteFeatureBase>
  );
});

const UserBulkDeleteIcon = React.memo(function UserBulkDeleteIcon(props: UserBulkDeleteFeatureProps) {
  return (
    <Tooltip title="Архивировать выбранных пользователей">
      <UserBulkDeleteFeatureBase
        icon={<DeleteFilled style={{ fontSize: 18 }} />}
        size="middle"
        type="link"
        {...props}
      />
    </Tooltip>
  );
});

export const UserBulkDeleteFeature = {
  Icon: UserBulkDeleteIcon,
  Button: UserBulkDeleteButton
};
