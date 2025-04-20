import React from "react";
import { useAsyncFn } from "react-use";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import {
  ProjectLog,
  ProjectLogsTableModule,
  ProjectLogView,
  useProjectLogsTableModule
} from "../../../entities/project";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";

interface ProjectLogsTableProps extends TableProps<ProjectLog> {
  selectedRowColumnTitleOptions?: (logs: ProjectLog[], onSuccess?: () => Promise<void>) => React.ReactNode;
  showSearch?: boolean;
}

export const ProjectLogsWidget: React.FC<ProjectLogsTableProps> = observer(function ProjectLogsTable({
  selectedRowColumnTitleOptions,
  showSearch,
  ...props
}: ProjectLogsTableProps) {
  const projectLogsTableModule: ProjectLogsTableModule = useProjectLogsTableModule();
  const { rows } = projectLogsTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => projectLogsTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 20);

  React.useEffect(() => {
    void loadFn();
  }, []);

  return (
    <ProjectLogView.Table
      virtual
      dataSource={convertDataToTableDataSource(data)}
      loading={loading}
      size="small"
      rowClassName={record => (record.deletedAt === null ? "" : "line-through")}
      locale={tableLocale}
      pagination={{
        locale: paginationLocale,
        position: ["bottomLeft"],
        showQuickJumper: true,
        responsive: true,
        showLessItems: true,
        total: data.length,
        current: currentPage,
        pageSize: pageSize
      }}
      onChange={onChange}
      {...props}
    />
  );
});
