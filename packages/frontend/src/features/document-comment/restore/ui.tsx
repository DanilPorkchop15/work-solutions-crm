import React from "react";
import { UndoOutlined } from "@ant-design/icons";
import { Button, type ButtonProps, Popconfirm } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { DocumentCommentService } from "../model";

interface RestoreDocumentCommentProps {
  commentId: string;
  onSuccess?: () => void;
  buttonProps?: ButtonProps;
}

export function RestoreDocumentComment({ commentId, onSuccess, buttonProps }: RestoreDocumentCommentProps) {
  const [loading, setLoading] = React.useState(false);
  const documentCommentService = useInjectService(DocumentCommentService);

  const handleRestore = async () => {
    try {
      setLoading(true);
      await documentCommentService.restoreComment(commentId);
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popconfirm
      title="Восстановить комментарий?"
      description="Вы уверены, что хотите восстановить этот комментарий?"
      onConfirm={handleRestore}
      okText="Да"
      cancelText="Отмена"
      placement="topRight"
    >
      <Button icon={<UndoOutlined />} size="small" loading={loading} {...buttonProps} />
    </Popconfirm>
  );
}
