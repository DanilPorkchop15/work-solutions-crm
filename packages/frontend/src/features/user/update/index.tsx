import React, { memo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { UserUpdateForm } from "@frontend/features/user/forms";
import { Button, Tooltip } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";
import { CreationModal } from "../../../shared/ui/creationModal/index";
const UserUpdateModal = memo(function UserUpdateFeature() {
  const navigate: NavigateFunction = useNavigate();

  const cancel: () => void = () => {
    navigate(AppRoutes.getUsersUrl(true));
  };

  return (
    <CreationModal title="Редактирование пользователя" onCancel={cancel}>
      <UserUpdateForm additionalOnFinish={cancel} />
    </CreationModal>
  );
});

interface UserUpdateIconProps {
  userId: string;
  disabled?: boolean;
}

const UserUpdateIcon: React.FC<UserUpdateIconProps> = ({ userId, disabled }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Tooltip title="Редактировать">
      <Button
        className="user-update-icon"
        onClick={() => {
          navigate(AppRoutes.getUpdateUserUrl(true, userId));
        }}
        disabled={disabled}
        icon={<EditFilled />}
        shape="circle"
        size="small"
        type="link"
      />
    </Tooltip>
  );
};

export const UserUpdateFeature = { Icon: UserUpdateIcon, Form: UserUpdateForm, Modal: UserUpdateModal };
