import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AccessCheck } from "@frontend/entities/viewer";
import { UserCreateModal } from "@frontend/features/user/forms";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Button, ButtonProps } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";

export const UserCreateButton = React.memo(function CreateUserFeature(props: ButtonProps) {
  const navigate: NavigateFunction = useNavigate();

  return (
    <AccessCheck type="disable" action={Action.CREATE} subject={Subject.USERS}>
      <Button
        size="large"
        onClick={() => {
          navigate(AppRoutes.getCreateUserUrl(true), { relative: "path" });
        }}
        {...props}
      >
        Создать пользователя
      </Button>
    </AccessCheck>
  );
});

export const UserCreateFeature = {
  Button: UserCreateButton,
  Modal: UserCreateModal
};
