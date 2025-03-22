import React from "react";
import { Link } from "react-router-dom";
import { formatToLocalDate } from "@frontend/shared/lib/isoDateUtils";
import { AppRoutes } from "@frontend/shared/model/services";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { Table, type TableProps, Typography } from "antd";

import { User } from "../interfaces";

import { UserView } from "./index";

const columns: TableProps<User>["columns"] = [
  {
    title: "",
    key: "avatarUrl",
    render: (user: User) => (
      <Link to={AppRoutes.getUserUrl(true, user.id)}>
        <UserView.Avatar user={user} />
      </Link>
    )
  },
  {
    title: "Полное имя",
    dataIndex: "fullName",
    key: "fullName"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: email => <Link to={`mailto:${email}`}>{email}</Link>
  },
  {
    title: "Должность",
    dataIndex: "position",
    key: "position",
    render: position => <Typography.Text>{position ?? "-"}</Typography.Text>
  },
  {
    title: "Роль",
    dataIndex: "role",
    key: "role",
    filterMultiple: false,
    filters: [
      { text: "Admin", value: Role.ADMIN },
      { text: "User", value: Role.USER },
      { text: "Manager", value: Role.MANAGER },
      { text: "Moderator", value: Role.MODERATOR }
    ]
  },
  {
    title: "Дата создания",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    defaultSortOrder: "ascend",
    render: (date: ISO) => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Дата обновления",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: true,
    render: (date: ISO) => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Архивирован",
    dataIndex: "deletedAt",
    key: "deletedAt",
    render: (date: ISO | null) => <Typography.Text>{date ? "Да" : "Нет"}</Typography.Text>
  }
];

export const UsersTableView = React.memo(function UsersTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<User>) {
  return <Table<User> columns={[...columns, ...propsColumns]} {...props} />;
});
