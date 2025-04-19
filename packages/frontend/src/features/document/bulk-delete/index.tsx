import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { DocumentPreview } from "@frontend/entities/document";
import { AccessCheck } from "@frontend/entities/viewer";
import { AntdServices } from "@frontend/shared/model/services";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { DocumentService } from "../services/DocumentService";

interface DocumentBulkDeleteFeatureProps {
  documents: DocumentPreview[];
  disabled?: boolean;
  onSuccess?: () => void;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Выбранные документы успешно удалены";

const DocumentBulkDeleteFeatureBase = React.memo(function BulkDeleteDocumentsFeature({
  documents,
  disabled,
  onSuccess,
  children,
  ...props
}: DocumentBulkDeleteFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const documentService: DocumentService = useInjectService(DocumentService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const documentBulkDeleteFn: () => Promise<void> = async () => {
    await documentService.bulkDelete(documents.map(document => document.id));
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Архивировать"
        subtitle={<Typography.Text>Вы уверены, что хотите архивировать {documents.length} документов?</Typography.Text>}
        title="Архивировать документы"
      />
      <AccessCheck type="disable" action={Action.DELETE} subject={Subject.DOCUMENTS}>
        <Button
          danger
          disabled={disabled ?? (documents.length === 0 || documents.some(d => d.deletedAt !== null))}
          onClick={withConfirmation(documentBulkDeleteFn)}
          {...props}
        >
          {children}
        </Button>
      </AccessCheck>
    </>
  );
});

const DocumentBulkDeleteButton = React.memo(function DocumentBulkDeleteButton(props: DocumentBulkDeleteFeatureProps) {
  return (
    <DocumentBulkDeleteFeatureBase type="primary" {...props}>
      {props.documents.length > 0 ? "Архивировать" : "Выберите документы"}
    </DocumentBulkDeleteFeatureBase>
  );
});

const DocumentBulkDeleteIcon = React.memo(function DocumentBulkDeleteIcon(props: DocumentBulkDeleteFeatureProps) {
  return (
    <Tooltip title="Архивировать выбранные документы">
      <DocumentBulkDeleteFeatureBase
        icon={<DeleteFilled style={{ fontSize: 18 }} />}
        size="middle"
        type="link"
        {...props}
      />
    </Tooltip>
  );
});

export const DocumentBulkDeleteFeature = {
  Icon: DocumentBulkDeleteIcon,
  Button: DocumentBulkDeleteButton
};
