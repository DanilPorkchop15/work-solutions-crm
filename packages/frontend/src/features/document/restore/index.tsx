import React from "react";
import { RedoOutlined } from "@ant-design/icons";
import { DocumentPreview } from "@frontend/entities/document";
import { AccessCheck } from "@frontend/entities/viewer";
import { AntdServices } from "@frontend/shared/model/services";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { DocumentService } from "../services/DocumentService";

interface DocumentRestoreFeatureProps extends ButtonProps {
  document: DocumentPreview;
  disabled?: boolean;
  onSuccess?: () => void | Promise<void>;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Документ успешно восстановлен";

const DocumentRestoreFeatureBase = React.memo(function RestoreDocumentFeature({
  document,
  disabled,
  onSuccess,
  children,
  ...props
}: DocumentRestoreFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const documentService: DocumentService = useInjectService(DocumentService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const documentRestoreFn: () => Promise<void> = async () => {
    await documentService.restore(document.id);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    void onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Восстановить"
        subtitle={
          <Typography.Text>
            Вы уверены, что хотите восстановить документ —{" "}
            <Typography.Text type="danger">{document.name}</Typography.Text>
          </Typography.Text>
        }
        title="Восстановить документ"
      />
      <AccessCheck type="disable" action={Action.UPDATE} subject={Subject.DOCUMENTS}>
        <Button disabled={disabled} onClick={withConfirmation(documentRestoreFn)} {...props}>
          {children}
        </Button>
      </AccessCheck>
    </>
  );
});

const DocumentRestoreButton = React.memo(function DocumentRestoreButton(props: DocumentRestoreFeatureProps) {
  return (
    <DocumentRestoreFeatureBase type="primary" {...props}>
      {props.document.deletedAt ? "Восстановить" : "Архивировать"}
    </DocumentRestoreFeatureBase>
  );
});

const DocumentRestoreIcon = React.memo(function DocumentRestoreIcon(props: DocumentRestoreFeatureProps) {
  return (
    <Tooltip title="Восстановить">
      <DocumentRestoreFeatureBase icon={<RedoOutlined />} size="small" type="primary" shape="circle" {...props} />
    </Tooltip>
  );
});

export const DocumentRestoreFeature = {
  Icon: DocumentRestoreIcon,
  Button: DocumentRestoreButton
};
