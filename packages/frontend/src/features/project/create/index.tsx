import React from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCreateModal } from "@frontend/features/project/forms";
import { Button } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";

export const ProjectCreateButton = React.memo(function ProjectCreateButton() {
  const navigate = useNavigate();

  return (
    <Button size="large" type="primary" onClick={() => navigate(AppRoutes.getCreateProjectUrl(), { relative: "path" })}>
      Создать проект
    </Button>
  );
});

export const ProjectCreateFeature = {
  Button: ProjectCreateButton,
  Modal: ProjectCreateModal
};
