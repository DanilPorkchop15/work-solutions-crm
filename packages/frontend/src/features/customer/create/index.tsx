import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { CustomerCreateModal } from "@frontend/features/customer/forms";
import { Button } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";

export const CustomerCreateButton = React.memo(function CreateTariffFeature() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Button
      size="large"
      type="primary"
      onClick={() => {
        navigate(AppRoutes.getCreateCustomerUrl(), { relative: "path" });
      }}
    >
      Создать клиента
    </Button>
  );
});

export const CustomerCreateFeature = {
  Button: CustomerCreateButton,
  Modal: CustomerCreateModal
};
