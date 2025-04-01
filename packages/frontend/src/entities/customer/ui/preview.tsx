import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Descriptions, Flex, List, Tooltip, Typography } from "antd";

import { formatToLocalDate } from "../../../shared/lib/isoDateUtils";
import { CustomerPreview } from "../interfaces";

export const CustomerPreviewTooltip: React.FC<{ customer: CustomerPreview }> = ({ customer }) => (
  <Tooltip
    title={
      <List
        size="small"
        bordered={false}
        dataSource={[
          `Название: ${customer.name}`,
          `Почта: ${customer.email ?? "Не указана"}`,
          `Создатель: ${customer.userCreated.fullName}`,
          `Архивирован: ${customer.deletedAt ? "Да" : "Нет"}`
        ]}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    }
  >
    <InfoCircleOutlined className="ml-1 cursor-pointer" />
  </Tooltip>
);
