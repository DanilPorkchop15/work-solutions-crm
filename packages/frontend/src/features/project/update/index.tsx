import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { ProjectUpdateForm } from "@frontend/features/project/forms";
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
      <Button
        className="project-update-icon"
        onClick={() => navigate(AppRoutes.getUpdateProjectUrl(true, projectId))}
        disabled={disabled}
        icon={<EditFilled />}
        shape="circle"
        size="small"
        type="link"
      />
    </Tooltip>
  );
};

export const ProjectUpdateFeature = {
  Icon: ProjectUpdateIcon,
  Form: ProjectUpdateForm,
  Modal: ProjectUpdateModal
};
