import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { CustomerCreateModal } from "@frontend/features/customer/forms";
import { Button, ButtonProps } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";

export const CustomerCreateButton = React.memo(function CreateTariffFeature(props: ButtonProps) {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Button
      size="large"
      onClick={() => {
        navigate(AppRoutes.getCreateCustomerUrl(true), { relative: "path" });
      }}
      {...props}
    >
      Создать клиента
    </Button>
  );
});

export const CustomerCreateFeature = {
  Button: CustomerCreateButton,
  Modal: CustomerCreateModal
};
