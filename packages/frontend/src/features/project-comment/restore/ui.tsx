import React from "react";
import { Button, Popconfirm, type ButtonProps } from "antd";
import { UndoOutlined } from "@ant-design/icons";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { ProjectCommentService } from "../model";

interface RestoreProjectCommentProps {
  commentId: string;
  onSuccess?: () => void;
  buttonProps?: ButtonProps;
}

export function RestoreProjectComment({ 
  commentId, 
  onSuccess,
  buttonProps
}: RestoreProjectCommentProps) {
  const [loading, setLoading] = React.useState(false);
  const projectCommentService = useInjectService(ProjectCommentService);

  const handleRestore = async () => {
    try {
      setLoading(true);
      await projectCommentService.restoreComment(commentId);
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
      <Button 
        icon={<UndoOutlined />} 
        size="small"
        loading={loading}
        {...buttonProps}
      />
    </Popconfirm>
  );
} 