import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Flex, List, Tooltip } from "antd";

import { UserPreview } from "../../interfaces";

import { UserView } from "./index";

export const UserPreviewTooltip: React.FC<{ user: UserPreview }> = ({ user }) => (
  <Tooltip
    title={
      <Flex vertical gap={12} align="center">
        <UserView.Avatar user={user} />
        <List
          size="small"
          bordered={false}
          dataSource={[
            `Имя: ${user.firstName}`,
            `Фамилия: ${user.lastName}`,
            `Email: ${user.email}`,
            `Должность: ${user.position ?? "-"}`,
            `Архивирован: ${user.deletedAt ? "Да" : "Нет"}`
          ]}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Flex>
    }
  >
    <InfoCircleOutlined className="ml-1 cursor-pointer" />
  </Tooltip>
);
