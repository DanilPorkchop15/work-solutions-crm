import React from "react";
import { Link } from "react-router-dom";
import { UserView } from "@frontend/entities/@common/user";
import { Card, Flex, Table, type TableProps, Typography } from "antd";

import { formatToLocalDateTime } from "../../../../shared/lib/isoDateUtils";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";
import { DocumentComment } from "../../interfaces/document-comment";

const { Paragraph, Text } = Typography;

const columns: TableProps<DocumentComment>["columns"] = [
  {
    title: "Автор",
    dataIndex: "user",
    key: "user",
    width: 250,
    render: (user: DocumentComment["user"]) => (
      <Link to={AppRoutes.getUserUrl(true, user.id)}>
        <Flex gap={12} align="center">
          <UserView.Avatar user={user} showTooltip={true} />
          <Flex vertical>
            <Text strong>{user.fullName}</Text>
            <Text type={user.deletedAt ? "danger" : "secondary"} italic={user.deletedAt !== null}>
              {user.email}
            </Text>
          </Flex>
        </Flex>
      </Link>
    )
  },
  {
    title: "Комментарий",
    dataIndex: "text",
    key: "text",
    render: (text: string) => (
      <Card
        size="small"
        bodyStyle={{
          padding: "8px 12px",
          borderRadius: 8
        }}
      >
        <Paragraph style={{ margin: 0 }}>{text}</Paragraph>
      </Card>
    )
  },
  {
    title: "Дата",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 180,
    sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    defaultSortOrder: "descend",
    render: (date: string) => <Text type="secondary">{formatToLocalDateTime(date)}</Text>
  }
];

export const DocumentCommentTableView = React.memo(function DocumentCommentTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<DocumentComment>) {
  return (
    <Table<DocumentComment>
      columns={[...columns, ...propsColumns]}
      pagination={{ pageSize: 10, showSizeChanger: false }}
      rowKey="id"
      showHeader={false}
      {...props}
    />
  );
}); 