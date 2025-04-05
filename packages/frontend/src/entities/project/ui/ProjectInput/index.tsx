import React from "react";
import { ProjectStatus } from "@work-solutions-crm/libs/shared/project/project.dto";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";

import { UserView } from "../../../@common/user/ui";
import { CustomerView } from "../../../customer/ui";
import { translateStatus } from "../../lib";

import { validationRules } from "./config";

const { TextArea } = Input;
const { Option } = Select;

interface ProjectNameInputProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

export const ProjectNameInput = ({ initialValue, error, disabled }: ProjectNameInputProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Название"
    name="name"
    rules={validationRules.name}
    validateStatus={error ? "error" : undefined}
  >
    <Input maxLength={100} placeholder="Название проекта" disabled={disabled} />
  </Form.Item>
);

interface ProjectDescriptionInputProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

export const ProjectDescriptionInput = ({ initialValue, error, disabled }: ProjectDescriptionInputProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Описание"
    name="description"
    rules={validationRules.description}
    validateStatus={error ? "error" : undefined}
  >
    <TextArea rows={4} maxLength={500} placeholder="Описание проекта" disabled={disabled} />
  </Form.Item>
);

interface ProjectDatesInputProps {
  error?: Error;
  disabled?: boolean;
  initialValues?: { start_date: dayjs.Dayjs; end_date: dayjs.Dayjs };
}

export const ProjectDatesInput = ({ error, disabled, initialValues }: ProjectDatesInputProps) => (
  <>
    <Form.Item
      label="Дата начала"
      name="start_date"
      rules={validationRules.start_date}
      validateStatus={error ? "error" : undefined}
      initialValue={initialValues?.start_date}
    >
      <DatePicker
        disabled={disabled}
        style={{ width: "100%" }}
        format="DD.MM.YYYY"
        disabledDate={current => current && current < dayjs().startOf("day")}
        placeholder="Дата начала"
      />
    </Form.Item>
    <Form.Item
      label="Дата окончания"
      name="end_date"
      rules={validationRules.end_date}
      validateStatus={error ? "error" : undefined}
      initialValue={initialValues?.end_date}
      dependencies={["start_date"]}
    >
      <DatePicker disabled={disabled} style={{ width: "100%" }} format="DD.MM.YYYY" placeholder="Дата окончания" />
    </Form.Item>
  </>
);

interface ProjectBudgetInputProps {
  initialValue?: number;
  error?: Error;
  disabled?: boolean;
}

export const ProjectBudgetInput = ({ initialValue, error, disabled }: ProjectBudgetInputProps) => (
  <Form.Item
    initialValue={initialValue}
    rules={validationRules.budget}
    label="Бюджет"
    name="budget"
    validateStatus={error ? "error" : undefined}
  >
    <InputNumber
      min={0}
      step={1000}
      style={{ width: "100%" }}
      placeholder="Бюджет проекта"
      disabled={disabled}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
    />
  </Form.Item>
);

interface ProjectCustomerInputProps {
  initialValue?: string;
  error?: Error;
  disabled?: boolean;
}

export const ProjectCustomerInput = ({ initialValue, error, disabled }: ProjectCustomerInputProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Клиент"
    name="customer_id"
    rules={validationRules.customer_id}
    validateStatus={error ? "error" : undefined}
  >
    <CustomerView.Select disabled={disabled} />
  </Form.Item>
);

interface ProjectUsersAccountableInputProps {
  initialValue?: string[];
  error?: Error;
  disabled?: boolean;
}

export const ProjectUsersAccountableInput = ({ initialValue, error, disabled }: ProjectUsersAccountableInputProps) => (
  <Form.Item
    initialValue={initialValue}
    label="Ответственные"
    name="users_accountable"
    rules={validationRules.users_accountable}
    validateStatus={error ? "error" : undefined}
  >
    <UserView.Select mode="multiple" disabled={disabled} />
  </Form.Item>
);

interface ProjectStatusInputProps {
  initialValue?: ProjectStatus;
  error?: Error;
  disabled?: boolean;
}

export const ProjectStatusInput = ({ initialValue, error, disabled }: ProjectStatusInputProps) => (
  <Form.Item
    initialValue={initialValue ?? ProjectStatus.ACTIVE}
    label="Статус"
    name="status"
    rules={validationRules.status}
    validateStatus={error ? "error" : undefined}
  >
    <Select disabled={disabled}>
      {Object.values(ProjectStatus).map(status => (
        <Option key={status} value={status}>
          {translateStatus(status as ProjectStatus)}
        </Option>
      ))}
    </Select>
  </Form.Item>
);

export const ProjectInput = {
  Name: ProjectNameInput,
  Description: ProjectDescriptionInput,
  Dates: ProjectDatesInput,
  Budget: ProjectBudgetInput,
  Customer: ProjectCustomerInput,
  UsersAccountable: ProjectUsersAccountableInput,
  Status: ProjectStatusInput
};
