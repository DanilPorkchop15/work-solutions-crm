import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { observer } from "mobx-react-lite";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { DocumentCommentService } from "../model";

interface DeleteDocumentCommentProps {
  commentId: string;
  onSuccess?: () => void;
}

export const DeleteDocumentComment = observer(function DeleteDocumentComment({
  commentId,
  onSuccess
}: DeleteDocumentCommentProps) {
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
      title="Удаление комментария"
      description="Вы действительно хотите удалить этот комментарий?"
      onConfirm={handleDelete}
      okText="Да"
      cancelText="Нет"
    >
      <Button type="text" danger icon={<DeleteOutlined />} loading={loading} />
    </Popconfirm>
  );
}); 