import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomerPreview } from "@frontend/entities/customer";
import { AccessCheck } from "@frontend/entities/viewer";
import { ProjectCreateModal } from "@frontend/features/project/forms";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Button, ButtonProps } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";

export const ProjectCreateButton = React.memo(function ProjectCreateButton(props: ButtonProps) {
  const navigate = useNavigate();

  return (
    <AccessCheck type="disable" action={Action.CREATE} subject={Subject.PROJECTS}>
      <Button
        size="large"
        onClick={() => navigate(AppRoutes.getCreateProjectUrl(true), { relative: "path" })}
        {...props}
      >
        Создать проект
      </Button>
    </AccessCheck>
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
    <AccessCheck type="disable" action={Action.CREATE} subject={Subject.PROJECTS}>
      <Button
        size="large"
        onClick={() => navigate(AppRoutes.getCreateProjectForCustomerUrl(true, customer.id), { relative: "path" })}
        {...props}
      >
        Добавить проект для {customer.name}
      </Button>
    </AccessCheck>
  );
});

export const ProjectCreateFeature = {
  Button: ProjectCreateButton,
  Modal: ProjectCreateModal,
  ForCustomerButton: ProjectCreateForCustomerButton
};
