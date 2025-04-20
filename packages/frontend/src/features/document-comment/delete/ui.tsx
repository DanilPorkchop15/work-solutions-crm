import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Button, type ButtonProps, Popconfirm } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { DocumentCommentService } from "../model";

interface DeleteDocumentCommentProps {
  commentId: string;
  onSuccess?: () => void;
  buttonProps?: ButtonProps;
}

export function DeleteDocumentComment({ commentId, onSuccess, buttonProps }: DeleteDocumentCommentProps) {
  const [loading, setLoading] = React.useState(false);
  const documentCommentService = useInjectService(DocumentCommentService);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await documentCommentService.deleteComment(commentId);
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popconfirm
      title="Удалить комментарий?"
      description="Вы уверены, что хотите удалить этот комментарий?"
      onConfirm={handleDelete}
      okText="Да"
      cancelText="Отмена"
      placement="topRight"
      icon={<DeleteFilled />}
    >
      <Button danger icon={<DeleteFilled />} type="link" size="small" loading={loading} {...buttonProps} />
    </Popconfirm>
  );
}
