import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { DocumentCommentService } from "../model";

interface CreateDocumentCommentProps {
  documentId: string;
  onSuccess?: () => void;
}

export const CreateDocumentComment = observer(function CreateDocumentComment({
  documentId,
  onSuccess
}: CreateDocumentCommentProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const documentCommentService = useInjectService(DocumentCommentService);

  const handleFinish = async (values: { text: string }) => {
    try {
      setLoading(true);
      await documentCommentService.createComment(documentId, values.text);
      form.resetFields();
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="text" rules={[{ required: true, message: "Введите текст комментария" }]} className="mb-4">
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
