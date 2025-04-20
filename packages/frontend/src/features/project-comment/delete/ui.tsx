import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Button, type ButtonProps, Popconfirm } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { ProjectCommentService } from "../model";

interface DeleteProjectCommentProps {
  commentId: string;
  onSuccess?: () => void;
  buttonProps?: ButtonProps;
}

export function DeleteProjectComment({ commentId, onSuccess, buttonProps }: DeleteProjectCommentProps) {
  const [loading, setLoading] = React.useState(false);
  const projectCommentService = useInjectService(ProjectCommentService);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await projectCommentService.deleteComment(commentId);
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
