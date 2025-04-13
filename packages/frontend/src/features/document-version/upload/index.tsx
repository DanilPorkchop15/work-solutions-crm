import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { DocumentPreview } from "@frontend/entities/document";
import { AccessCheck } from "@frontend/entities/viewer";
import { DocumentVersionsService } from "@frontend/features/document-version/service";
import { useInjectService } from "@frontend/shared/lib/useInjectService";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Button, ButtonProps, Upload } from "antd";
import { RcFile } from "antd/es/upload";

export const DocumentVersionUploadButton = ({
  document,
  onSuccess,
  onError,
  ...props
}: {
  document: DocumentPreview;
  onSuccess?: () => Promise<void> | void;
  onError?: (err: Error) => void;
} & ButtonProps) => {
  const documentVersionsService: DocumentVersionsService = useInjectService(DocumentVersionsService);

  const handleUpload = async (file: RcFile) => {
    try {
      await documentVersionsService.upload(document.id, file);
      await onSuccess?.();
    } catch (err) {
      onError?.(err as Error);
    }
  };

  return (
    <AccessCheck type="disable" action={Action.READ} subject={Subject.DOCUMENTS}>
      <Upload name="file" accept="*" beforeUpload={handleUpload} showUploadList={false} maxCount={1}>
        <Button icon={<UploadOutlined />} {...props}>
          Загрузить версию
        </Button>
      </Upload>
    </AccessCheck>
  );
};

export const DocumentVersionUploadFeature = {
  Button: DocumentVersionUploadButton
};
