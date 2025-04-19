import React from "react";
import { Link } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import { UserPreview } from "@frontend/entities/@common/user";
import { BASE_API_HOST } from "@frontend/shared/config/const";
import { AppRoutes } from "@frontend/shared/model/services";
import { Button, Divider, Flex, Table, type TableProps, Tooltip, Typography } from "antd";

import { formatToLocalDate } from "../../../../shared/lib/isoDateUtils";
import { DocumentVersion } from "../../interfaces";

const columns: TableProps<DocumentVersion>["columns"] = [
  {
    title: "Версия",
    dataIndex: "version",
    key: "version",
    width: 100,
    sorter: (a, b) => a.version - b.version,
    defaultSortOrder: "descend",
    render: (version: number) => <Typography.Text strong>{version}</Typography.Text>
  },
  {
    title: "Ссылка на документ",
    dataIndex: "documentUrl",
    key: "documentUrl",
    width: 500,
    render: (url: string) => {
      const fullUrl = `${BASE_API_HOST}/${url}`;

      const handleDownload: () => Promise<void> = async () => {
        try {
          const response: Response = await fetch(fullUrl);
          const blob: Blob = await response.blob();
          const downloadUrl: string = window.URL.createObjectURL(blob);
          const link: HTMLAnchorElement = document.createElement("a");
          link.href = downloadUrl;
          link.download = url.split("/").pop() ?? "document";
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(downloadUrl);
          link.remove();
        } catch (error) {
          console.error("Download failed:", error);
        }
      };

      return (
        <Flex gap={12} align="center">
          <Typography.Link target="_blank" href={fullUrl} type="secondary">
            {fullUrl}
          </Typography.Link>
          <Divider type="vertical" />
          <Tooltip
            title={
              <Typography.Text>
                Ссылка на документ:{" "}
                <Typography.Link target="_blank" href={fullUrl}>
                  {fullUrl}
                </Typography.Link>
              </Typography.Text>
            }
          >
            <Button icon={<DownloadOutlined />} onClick={handleDownload}>
              Скачать
            </Button>
          </Tooltip>
        </Flex>
      );
    }
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
    render: (date: string) => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  },
  {
    title: "Дата обновления",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    render: (date: string) => <Typography.Text>{formatToLocalDate(date)}</Typography.Text>
  }
];

export const DocumentVersionsTableView = React.memo(function DocumentVersionsTableView({
  columns: propsColumns = [],
  ...props
}: TableProps<DocumentVersion>) {
  return <Table<DocumentVersion> columns={[...columns, ...propsColumns]} {...props} />;
});
