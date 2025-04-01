import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { List, Tooltip, Typography } from "antd";

import { formatToLocalDate } from "../../../shared/lib/isoDateUtils";
import { ProjectPreview } from "../interfaces";

export const ProjectPreviewTooltip: React.FC<{ project: ProjectPreview }> = ({ project }) => (
  <Tooltip
    title={
      <List
        size="small"
        bordered={false}
        dataSource={[
          { title: "Название", value: project.name },
          { title: "Статус", value: project.status },
          { title: "Дата начала", value: formatToLocalDate(project.startDate) },
          { title: "Дата окончания", value: formatToLocalDate(project.endDate) },
          { title: "Бюджет", value: project.budget ?? "Не указан" },
          { title: "Клиент", value: project.customer.name },
          { title: "Ответственные", value: project.usersAccountable.map(u => u.fullName).join(", ") },
          { title: "Архивирован", value: project.deletedAt ? "Да" : "Нет" }
        ]}
        renderItem={item => (
          <List.Item>
            <Typography.Text type="secondary">{item.title}:</Typography.Text>{" "}
            <Typography.Text>{item.value}</Typography.Text>
          </List.Item>
        )}
      />
    }
  >
    <InfoCircleOutlined className="ml-1 cursor-pointer" />
  </Tooltip>
);
