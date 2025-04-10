import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { UserCreateModal } from "@frontend/features/user/forms";
import { Button, ButtonProps } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";

export const UserCreateButton = React.memo(function CreateUserFeature(props: ButtonProps) {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Button
      size="large"
      onClick={() => {
        navigate(AppRoutes.getCreateUserUrl(true), { relative: "path" });
      }}
      {...props}
    >
      Создать пользователя
    </Button>
  );
});

export const UserCreateFeature = {
  Button: UserCreateButton,
  Modal: UserCreateModal
};
