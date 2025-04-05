import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { DocumentPreview } from "@frontend/entities/document";
import { AntdServices } from "@frontend/shared/model/services";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { DocumentService } from "../services/DocumentService";

interface DocumentDeleteFeatureProps extends ButtonProps {
  document: DocumentPreview;
  disabled?: boolean;
  onSuccess?: () => void | Promise<void>;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Документ успешно архивирован";

const DocumentDeleteFeatureBase = React.memo(function DeleteDocumentFeature({
  document,
  disabled,
  onSuccess,
  children,
  ...props
}: DocumentDeleteFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const documentService: DocumentService = useInjectService(DocumentService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const documentDeleteFn: () => Promise<void> = async () => {
    await documentService.delete(document.id);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Архивировать"
        subtitle={
          <Typography.Text>
            Вы уверены, что хотите удалить документ — <Typography.Text type="danger">{document.name}</Typography.Text>
          </Typography.Text>
        }
        title="Архивировать документ"
      />
      <Button danger disabled={disabled} onClick={withConfirmation(documentDeleteFn)} {...props}>
        {children}
      </Button>
    </>
  );
});

const DocumentDeleteButton = React.memo(function DocumentDeleteButton(props: DocumentDeleteFeatureProps) {
  return (
    <DocumentDeleteFeatureBase type="primary" {...props}>
      {props.document.deletedAt ? "Архивный документ" : "Архивировать"}
    </DocumentDeleteFeatureBase>
  );
});

const DocumentDeleteIcon = React.memo(function DocumentDeleteIcon(props: DocumentDeleteFeatureProps) {
  return (
    <Tooltip title={props.document.deletedAt ? "Архивный документ" : "Архивировать"}>
      <DocumentDeleteFeatureBase icon={<DeleteFilled style={{ fontSize: 18 }} />} size="small" type="link" {...props} />
    </Tooltip>
  );
});

export const DocumentDeleteFeature = {
  Icon: DocumentDeleteIcon,
  Button: DocumentDeleteButton
};
