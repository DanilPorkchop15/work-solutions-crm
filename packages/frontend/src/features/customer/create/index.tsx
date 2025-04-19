import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AccessCheck } from "@frontend/entities/viewer";
import { CustomerCreateModal } from "@frontend/features/customer/forms";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Button, ButtonProps } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";

export const CustomerCreateButton = React.memo(function CreateTariffFeature(props: ButtonProps) {
  const navigate: NavigateFunction = useNavigate();

  return (
    <AccessCheck type="disable" action={Action.CREATE} subject={Subject.CUSTOMERS}>
      <Button
        size="large"
        onClick={() => {
          navigate(AppRoutes.getCreateCustomerUrl(true), { relative: "path" });
        }}
        {...props}
      >
        Создать клиента
      </Button>
    </AccessCheck>
  );
});

export const CustomerCreateFeature = {
  Button: CustomerCreateButton,
  Modal: CustomerCreateModal
};
