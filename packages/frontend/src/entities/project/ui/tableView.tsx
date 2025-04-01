import React from "react";
import { Table, type TableProps, Typography } from "antd";

import { formatToLocalDate } from "../../../shared/lib/isoDateUtils";
import { ProjectPreview } from "../interfaces";

const columns: TableProps<ProjectPreview>["columns"] = [
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "Дата начала",
    dataIndex: "startDate",
    key: "startDate",
    render: date => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Дата окончания",
    dataIndex: "endDate",
    key: "endDate",
    render: date => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Бюджет",
    dataIndex: "budget",
    key: "budget",
    render: budget => <Typography.Text>{budget ?? "Не указан"}</Typography.Text>
  },
  {
    title: "Клиент",
    dataIndex: ["customer", "name"],
    key: "customer"
  },
  {
    title: "Архивирован",
    dataIndex: "deletedAt",
    key: "deletedAt",
    render: (date: string | null) => <Typography.Text>{date ? "Да" : "Нет"}</Typography.Text>
  }
];

export const ProjectsTableView = React.memo(function ProjectsTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<ProjectPreview>) {
  return <Table<ProjectPreview> columns={[...columns, ...propsColumns]} {...props} />;
});
