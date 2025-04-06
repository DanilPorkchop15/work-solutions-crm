import React from "react";
import { Link } from "react-router-dom";
import { UserPreview } from "@frontend/entities/@common/user";
import { AppRoutes } from "@frontend/shared/model/services";
import { Table, type TableProps, Typography } from "antd";

import { formatToLocalDate } from "../../../../shared/lib/isoDateUtils";
import { DocumentPreview } from "../../interfaces";

const columns: TableProps<DocumentPreview>["columns"] = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
    render: (name: string) => <Typography.Text ellipsis>{name}</Typography.Text>
  },
  {
    title: "Создатель",
    dataIndex: "userCreated",
    key: "userCreated",
    render: (user: UserPreview) => (
      <Typography.Link>
        <Link to={AppRoutes.getUserUrl(true, user.id)}>
          {user.fullName}
          {user.position && ` (${user.position})`}
        </Link>
      </Typography.Link>
    )
  },
  {
    title: "Дата создания",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    defaultSortOrder: "descend",
    render: (date: string) => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Дата обновления",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    render: (date: string) => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Архивирован",
    dataIndex: "deletedAt",
    key: "deletedAt",
    render: (date: string | null) => <Typography.Text>{date ? "Да" : "Нет"}</Typography.Text>
  }
];

export const DocumentsTableView = React.memo(function DocumentsTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<DocumentPreview>) {
  return <Table<DocumentPreview> columns={[...columns, ...propsColumns]} {...props} />;
});
