import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AccessCheck } from "@frontend/entities/viewer";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Button, ButtonProps } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";
import { DocumentCreateModal } from "../forms";

export const DocumentCreateButton = React.memo(function CreateTariffFeature(props: ButtonProps) {
  const navigate: NavigateFunction = useNavigate();

  return (
    <AccessCheck type="disable" action={Action.CREATE} subject={Subject.DOCUMENTS}>
      <Button
        size="large"
        onClick={() => {
          navigate(AppRoutes.getCreateDocumentUrl(true), { relative: "path" });
        }}
        {...props}
      >
        Создать документ
      </Button>
    </AccessCheck>
  );
});

export const DocumentCreateFeature = {
  Button: DocumentCreateButton,
  Modal: DocumentCreateModal
};
