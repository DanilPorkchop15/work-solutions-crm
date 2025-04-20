import React from "react";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { DocumentCommentService } from "../model";

interface UpdateDocumentCommentProps {
  commentId: string;
  initialText: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const UpdateDocumentComment = observer(function UpdateDocumentComment({
  commentId,
  initialText,
  onSuccess,
  onCancel
}: UpdateDocumentCommentProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const documentCommentService = useInjectService(DocumentCommentService);

  React.useEffect(() => {
    form.setFieldsValue({ text: initialText });
  }, [form, initialText]);

  const handleFinish = async (values: { text: string }) => {
    try {
      setLoading(true);
      await documentCommentService.updateComment(commentId, values.text);
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical" initialValues={{ text: initialText }}>
      <Form.Item name="text" rules={[{ required: true, message: "Введите текст комментария" }]} className="mb-2">
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Отмена
        </Button>
        <Button type="primary" icon={<SaveOutlined />} htmlType="submit" loading={loading}>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}); 