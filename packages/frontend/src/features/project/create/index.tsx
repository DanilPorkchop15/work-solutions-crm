import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomerPreview } from "@frontend/entities/customer";
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

interface ProjectCreateForCustomerButtonProps extends ButtonProps {
  customer: CustomerPreview;
}

export const ProjectCreateForCustomerButton = React.memo(function ProjectCreateButton({
  customer,
  ...props
}: ProjectCreateForCustomerButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      size="large"
      onClick={() => navigate(AppRoutes.getCreateProjectForCustomerUrl(true, customer.id), { relative: "path" })}
      {...props}
    >
      Добавить проект для {customer.name}
    </Button>
  );
});

export const ProjectCreateFeature = {
  Button: ProjectCreateButton,
  Modal: ProjectCreateModal,
  ForCustomerButton: ProjectCreateForCustomerButton
};
