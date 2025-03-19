import React from "react";
import { Row, Typography } from "antd";

import type { User } from "../interfaces";

interface UserListItemProps {
  user: User;
}

export const UserListItemView = React.memo(function UserListItemView({ user }: UserListItemProps) {
  return (
    <Row className="flex-row flex-nowrap gap-2">
      <Typography.Text>{user.fullName}</Typography.Text>
      <Typography.Text type="secondary">{user.email}</Typography.Text>
    </Row>
  );
});
