import React from "react";
import { Link } from "react-router-dom";
import { CustomerPreview } from "@frontend/entities/customer";
import { translateStatus } from "@frontend/entities/project/lib";
import { AppRoutes } from "@frontend/shared/model/services";
import { ProjectStatus } from "@work-solutions-crm/libs/shared/project/project.dto";
import { Table, type TableProps, Typography } from "antd";

import { formatToLocalDate } from "../../../../shared/lib/isoDateUtils";
import { ProjectPreview } from "../../interfaces";

const columns: TableProps<ProjectPreview>["columns"] = [
  {
    title: "Наименование",
    dataIndex: "name",
    filterSearch: true,
    key: "name"
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    filters: Object.values(ProjectStatus).map(status => ({ text: translateStatus(status), value: status })),
    render: status => <Typography.Text>{translateStatus(status)}</Typography.Text>
  },
  {
    title: "Дата начала",
    dataIndex: "startDate",
    key: "startDate",
    sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    defaultSortOrder: "descend",
    render: date => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Дата окончания",
    dataIndex: "endDate",
    key: "endDate",
    sorter: (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
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
    dataIndex: "customer",
    key: "customer",
    render: (customer: ProjectPreview["customer"]) => (
      <Typography.Link>
        <Link to={AppRoutes.getCustomerUrl(true, customer.id)}>{customer.name}</Link>
      </Typography.Link>
    )
  },
  {
    title: "Создатель",
    dataIndex: "userCreated",
    key: "userCreated",
    render: (user: CustomerPreview["userCreated"]) => (
      <Typography.Link>
        <Link to={AppRoutes.getUserUrl(true, user.id)}>
          {user.fullName}
          {user.position && ` (${user.position})`}
        </Link>
      </Typography.Link>
    )
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
