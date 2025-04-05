import React from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCreateModal } from "@frontend/features/project/forms";
import { Button, ButtonProps } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";

export const ProjectCreateButton = React.memo(function ProjectCreateButton(props: ButtonProps) {
  const navigate = useNavigate();

  return (
    <Button size="large" onClick={() => navigate(AppRoutes.getCreateProjectUrl(true), { relative: "path" })} {...props}>
      Создать проект
    </Button>
  );
});

export const ProjectCreateFeature = {
  Button: ProjectCreateButton,
  Modal: ProjectCreateModal
};
