import React from "react";
import { UndoOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { observer } from "mobx-react-lite";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { DocumentCommentService } from "../model";

interface RestoreDocumentCommentProps {
  commentId: string;
  onSuccess?: () => void;
}

export const RestoreDocumentComment = observer(function RestoreDocumentComment({
  commentId,
  onSuccess
}: RestoreDocumentCommentProps) {
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
      title="Восстановление комментария"
      description="Вы действительно хотите восстановить этот комментарий?"
      onConfirm={handleRestore}
      okText="Да"
      cancelText="Нет"
    >
      <Button type="text" icon={<UndoOutlined />} loading={loading} />
    </Popconfirm>
  );
}); 