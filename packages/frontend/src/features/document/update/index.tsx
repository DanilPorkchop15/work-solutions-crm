import React, { memo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { AccessCheck } from "@frontend/entities/viewer";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Button, Tooltip } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";
import { CreationModal } from "../../../shared/ui/creationModal/index";
import { DocumentUpdateForm } from "../forms";

const DocumentUpdateModal = memo(function DocumentUpdateFeature() {
  const navigate: NavigateFunction = useNavigate();

  const cancel: () => void = () => {
    navigate(AppRoutes.getDocumentsUrl(true));
  };

  return (
    <CreationModal title="Редактирование документа" onCancel={cancel}>
      <DocumentUpdateForm additionalOnFinish={cancel} />
    </CreationModal>
  );
});

interface DocumentUpdateIconProps {
  documentId: string;
  disabled?: boolean;
}

const DocumentUpdateIcon: React.FC<DocumentUpdateIconProps> = ({ documentId, disabled }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Tooltip title="Редактировать">
      <AccessCheck type="disable" action={Action.UPDATE} subject={Subject.DOCUMENTS}>
        <Button
          className="document-update-icon"
          onClick={() => {
            navigate(AppRoutes.getUpdateDocumentUrl(true, documentId));
          }}
          disabled={disabled}
          icon={<EditFilled />}
          shape="circle"
          size="small"
          type="link"
        ></Button>
      </AccessCheck>
    </Tooltip>
  );
};

export const DocumentUpdateFeature = { Icon: DocumentUpdateIcon, Form: DocumentUpdateForm, Modal: DocumentUpdateModal };
