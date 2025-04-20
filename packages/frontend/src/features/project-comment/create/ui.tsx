import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { observer } from "mobx-react-lite";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { ProjectCommentService } from "../model";

interface CreateProjectCommentProps {
  projectId: string;
  onSuccess?: () => void;
}

export const CreateProjectComment = observer(function CreateProjectComment({
  projectId,
  onSuccess
}: CreateProjectCommentProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const projectCommentService = useInjectService(ProjectCommentService);

  const handleFinish = async (values: { text: string }) => {
    try {
      setLoading(true);
      await projectCommentService.createComment(projectId, values.text);
      form.resetFields();
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="text" rules={[{ required: true, message: "Введите текст комментария" }]} className="mb-2">
        <Input.TextArea rows={3} placeholder="Введите комментарий..." />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
        <Button type="primary" icon={<RightOutlined />} htmlType="submit" loading={loading}>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
});
