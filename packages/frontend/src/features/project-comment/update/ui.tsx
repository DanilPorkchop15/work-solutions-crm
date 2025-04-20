import React from "react";
import { EditFilled, EditOutlined } from "@ant-design/icons";
import { Button, type ButtonProps, Form, Input, Modal } from "antd";

import { ProjectComment } from "../../../entities/project/interfaces";
import { useInjectService } from "../../../shared/lib/useInjectService";
import { ProjectCommentService } from "../model";

interface UpdateProjectCommentProps {
  comment: ProjectComment;
  onSuccess?: () => void;
  buttonProps?: ButtonProps;
}

export function UpdateProjectComment({ comment, onSuccess, buttonProps }: UpdateProjectCommentProps) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const projectCommentService = useInjectService(ProjectCommentService);

  React.useEffect(() => {
    if (isModalVisible) {
      form.setFieldsValue({ text: comment.text });
    }
  }, [form, comment.text, isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: { text: string }) => {
    try {
      setLoading(true);
      await projectCommentService.updateComment(comment.id, values.text);
      setIsModalVisible(false);
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button icon={<EditFilled />} size="small" type="link" onClick={showModal} {...buttonProps} />
      <Modal title="Редактировать комментарий" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="text" rules={[{ required: true, message: "Введите текст комментария" }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Отмена
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
