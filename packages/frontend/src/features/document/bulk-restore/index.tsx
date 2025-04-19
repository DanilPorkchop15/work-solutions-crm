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

interface DocumentBulkRestoreFeatureProps {
  documents: DocumentPreview[];
  disabled?: boolean;
  onSuccess?: () => void;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Выбранные документы успешно восстановлены";

const DocumentBulkRestoreFeatureBase = React.memo(function BulkRestoreDocumentsFeature({
  documents,
  disabled,
  onSuccess,
  children,
  ...props
}: DocumentBulkRestoreFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const documentService: DocumentService = useInjectService(DocumentService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const documentBulkRestoreFn: () => Promise<void> = async () => {
    await documentService.bulkRestore(documents.map(document => document.id));
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Восстановить"
        subtitle={<Typography.Text>Вы уверены, что хотите восстановить {documents.length} документов?</Typography.Text>}
        title="Восстановить документы"
      />
      <AccessCheck type="disable" action={Action.UPDATE} subject={Subject.DOCUMENTS}>
        <Button
          type="primary"
          disabled={disabled ?? (documents.length === 0 || documents.some(d => d.deletedAt === null))}
          onClick={withConfirmation(documentBulkRestoreFn)}
          {...props}
        >
          {children}
        </Button>
      </AccessCheck>
    </>
  );
});

const DocumentBulkRestoreButton = React.memo(function DocumentBulkRestoreButton(
  props: DocumentBulkRestoreFeatureProps
) {
  return (
    <DocumentBulkRestoreFeatureBase type="primary" {...props}>
      {props.documents.length > 0 ? "Восстановить" : "Выберите документы"}
    </DocumentBulkRestoreFeatureBase>
  );
});

const DocumentBulkRestoreIcon = React.memo(function DocumentBulkRestoreIcon(props: DocumentBulkRestoreFeatureProps) {
  return (
    <Tooltip title="Восстановить выбранные документы">
      <DocumentBulkRestoreFeatureBase
        icon={<RedoOutlined />}
        size="small"
        type="primary"
        style={{ border: "none" }}
        shape="circle"
        {...props}
      />
    </Tooltip>
  );
});

export const DocumentBulkRestoreFeature = {
  Icon: DocumentBulkRestoreIcon,
  Button: DocumentBulkRestoreButton
};
