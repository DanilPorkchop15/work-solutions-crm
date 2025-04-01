import React from "react";
import { DeleteFilled, RedoOutlined } from "@ant-design/icons";
import { User } from "@frontend/entities/@common/user";
import { AntdServices } from "@frontend/shared/model/services";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { UserService } from "../services/UserService";

interface UserBulkRestoreFeatureProps {
  users: User[];
  disabled?: boolean;
  onSuccess?: () => void;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Выбранные пользователи успешно восстановлены";

const UserBulkRestoreFeatureBase = React.memo(function BulkRestoreUsersFeature({
  users,
  disabled,
  onSuccess,
  children,
  ...props
}: UserBulkRestoreFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const userService: UserService = useInjectService(UserService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const userBulkRestoreFn: () => Promise<void> = async () => {
    await userService.bulkRestore(users.map(user => user.id));
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Восстановить"
        subtitle={<Typography.Text>Вы уверены, что хотите восстановить {users.length} пользователей?</Typography.Text>}
        title="Восстановить пользователей"
      />
      <Button
        type="primary"
        disabled={disabled ?? (users.length === 0 || users.some(u => u.deletedAt === null))}
        onClick={withConfirmation(userBulkRestoreFn)}
        {...props}
      >
        {children}
      </Button>
    </>
  );
});

const UserBulkRestoreButton = React.memo(function UserBulkRestoreButton(props: UserBulkRestoreFeatureProps) {
  return (
    <UserBulkRestoreFeatureBase type="primary" {...props}>
      {props.users.length > 0 ? "Восстановить" : "Выберите пользователей"}
    </UserBulkRestoreFeatureBase>
  );
});

const UserBulkRestoreIcon = React.memo(function UserBulkRestoreIcon(props: UserBulkRestoreFeatureProps) {
  return (
    <Tooltip title="Восстановить выбранных пользователей">
      <UserBulkRestoreFeatureBase
        icon={<RedoOutlined />}
        style={{ border: "none" }}
        size="small"
        type="primary"
        shape="circle"
        {...props}
      />
    </Tooltip>
  );
});

export const UserBulkRestoreFeature = {
  Icon: UserBulkRestoreIcon,
  Button: UserBulkRestoreButton
};
