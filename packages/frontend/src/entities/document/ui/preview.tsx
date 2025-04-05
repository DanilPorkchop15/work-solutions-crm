import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";

import { formatToLocalDate } from "../../../shared/lib/isoDateUtils";
import { DocumentPreview } from "../interfaces";

export const DocumentPreviewTooltip: React.FC<{ document: DocumentPreview }> = ({ document }) => (
  <Tooltip
    title={
      <>
        <Typography.Text>Название: {document.name}</Typography.Text>
        <Typography.Text>Создатель: {document.userCreated.fullName}</Typography.Text>
        <Typography.Text>Дата создания: {formatToLocalDate(document.createdAt)}</Typography.Text>
        <Typography.Text>Архивирован: {document.deletedAt ? "Да" : "Нет"}</Typography.Text>
      </>
    }
  >
    <InfoCircleOutlined className="ml-1 cursor-pointer" />
  </Tooltip>
);
