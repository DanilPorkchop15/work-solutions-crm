import React from "react";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { Form, Input } from "antd";

import { UserView } from "../../../@common/user/ui";

import { validationRules } from "./config";

const { TextArea } = Input;

interface DocumentUrlInputProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

export const DocumentUrlInput = ({ initialValue, error, disabled }: DocumentUrlInputProps) => (
  <Form.Item
    initialValue={initialValue}
    label="URL документа"
    name="document_url"
    rules={validationRules.document_url}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={200} placeholder="URL документа" disabled={disabled} />
  </Form.Item>
);

interface DocumentNameInputProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

export const DocumentNameInput = ({ initialValue, error, disabled }: DocumentNameInputProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Название"
    name="name"
    rules={validationRules.name}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="Название документа" disabled={disabled} />
  </Form.Item>
);

interface DocumentDescriptionInputProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

export const DocumentDescriptionInput = ({ initialValue, error, disabled }: DocumentDescriptionInputProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Описание"
    name="description"
    rules={validationRules.description}
    validateStatus={error ? "error" : undefined}
  >
    <TextArea rows={4} maxLength={500} placeholder="Описание документа" disabled={disabled} />
  </Form.Item>
);

interface DocumentRolesInputProps {
  initialValue?: Role[];
  error?: Error;
  disabled?: boolean;
}

export const DocumentRolesInput = ({ initialValue, error, disabled }: DocumentRolesInputProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Доступен для ролей"
    name="roles"
    rules={validationRules.roles}
    validateStatus={error ? "error" : undefined}
  >
    <UserView.RoleSelect mode="multiple" disabled={disabled} />
  </Form.Item>
);

export const DocumentInput = {
  Url: DocumentUrlInput,
  Name: DocumentNameInput,
  Description: DocumentDescriptionInput,
  Roles: DocumentRolesInput
};
