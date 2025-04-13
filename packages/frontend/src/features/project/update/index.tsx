import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { AccessCheck } from "@frontend/entities/viewer";
import { ProjectUpdateForm } from "@frontend/features/project/forms";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Button, Tooltip } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";
import { CreationModal } from "../../../shared/ui/creationModal";

const ProjectUpdateModal = memo(function ProjectUpdateModal() {
  const navigate = useNavigate();
  const cancel = () => navigate(AppRoutes.getProjectsUrl(true));

  return (
    <CreationModal title="Редактирование проекта" onCancel={cancel}>
      <ProjectUpdateForm additionalOnFinish={cancel} />
    </CreationModal>
  );
});

interface ProjectUpdateIconProps {
  projectId: string;
  disabled?: boolean;
}

const ProjectUpdateIcon: React.FC<ProjectUpdateIconProps> = ({ projectId, disabled }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Редактировать">
      <AccessCheck type="disable" action={Action.UPDATE} subject={Subject.PROJECTS}>
        <Button
          className="project-update-icon"
          onClick={() => navigate(AppRoutes.getUpdateProjectUrl(true, projectId))}
          disabled={disabled}
          icon={<EditFilled />}
          shape="circle"
          size="small"
          type="link"
        />
      </AccessCheck>
    </Tooltip>
  );
};

export const ProjectUpdateFeature = {
  Icon: ProjectUpdateIcon,
  Form: ProjectUpdateForm,
  Modal: ProjectUpdateModal
};
