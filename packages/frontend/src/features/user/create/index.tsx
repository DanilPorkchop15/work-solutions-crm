import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { UserCreateModal } from "@frontend/features/user/forms";
import { Button } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";

export const UserCreateButton = React.memo(function CreateTariffFeature() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Button
      size="large"
      type="primary"
      onClick={() => {
        navigate(AppRoutes.getCreateUserUrl(), { relative: "path" });
      }}
    >
      Создать пользователя
    </Button>
  );
});

export const UserCreateFeature = {
  Button: UserCreateButton,
  Modal: UserCreateModal
};
