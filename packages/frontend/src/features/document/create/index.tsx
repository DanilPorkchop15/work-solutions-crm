import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";
import { DocumentCreateModal } from "../forms";

export const DocumentCreateButton = React.memo(function CreateTariffFeature() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Button
      size="large"
      type="primary"
      onClick={() => {
        navigate(AppRoutes.getCreateDocumentUrl(), { relative: "path" });
      }}
    >
      Создать документ
    </Button>
  );
});

export const DocumentCreateFeature = {
  Button: DocumentCreateButton,
  Modal: DocumentCreateModal
};
