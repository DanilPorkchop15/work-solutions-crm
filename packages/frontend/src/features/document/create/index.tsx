import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";
import { DocumentCreateModal } from "../forms";

export const DocumentCreateButton = React.memo(function CreateTariffFeature(props: ButtonProps) {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Button
      size="large"
      onClick={() => {
        navigate(AppRoutes.getCreateDocumentUrl(true), { relative: "path" });
      }}
      {...props}
    >
      Создать документ
    </Button>
  );
});

export const DocumentCreateFeature = {
  Button: DocumentCreateButton,
  Modal: DocumentCreateModal
};
