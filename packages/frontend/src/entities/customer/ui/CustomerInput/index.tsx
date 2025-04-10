import React from "react";
import { Form, Input } from "antd";

import { validationRules } from "./config";

interface CustomerNameProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

const CustomerNameInput = ({ initialValue, error, disabled }: CustomerNameProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Название"
    name="name"
    rules={validationRules.name}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="Название" disabled={disabled} />
  </Form.Item>
);

interface CustomerPhoneProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

const CustomerPhoneInput = ({ initialValue, error, disabled }: CustomerPhoneProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Телефон"
    name="phone"
    rules={validationRules.phone}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="Телефон" type="tel" disabled={disabled} />
  </Form.Item>
);

interface CustomerEmailProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

const CustomerEmailInput = ({ initialValue, error, disabled }: CustomerEmailProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Email"
    name="email"
    rules={validationRules.email}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="Email" disabled={disabled} />
  </Form.Item>
);

interface CustomerInnProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

const CustomerInnInput = ({ initialValue, error, disabled }: CustomerInnProps) => (
  <Form.Item
    initialValue={initialValue}
    label="ИНН"
    name="inn"
    rules={validationRules.inn}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="ИНН" disabled={disabled} />
  </Form.Item>
);

interface CustomerWebsiteProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

const CustomerWebsiteInput = ({ initialValue, error, disabled }: CustomerWebsiteProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Веб-сайт"
    name="website"
    rules={validationRules.website}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="Веб-сайт" disabled={disabled} />
  </Form.Item>
);

export const CustomerInput = {
  Name: CustomerNameInput,
  Phone: CustomerPhoneInput,
  Email: CustomerEmailInput,
  Inn: CustomerInnInput,
  Website: CustomerWebsiteInput
};
