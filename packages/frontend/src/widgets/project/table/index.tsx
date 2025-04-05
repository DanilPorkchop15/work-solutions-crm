import React from "react";
import { useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { User } from "@frontend/entities/@common/user";
import { Project, ProjectPreview, useProjectsTableModule } from "@frontend/entities/project";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { Flex, Input, Row, type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import { ProjectView } from "../../../entities/project/ui";
import { ProjectDeleteFeature } from "../../../features/project/delete";
import { ProjectRestoreFeature } from "../../../features/project/restore";
import { ProjectUpdateFeature } from "../../../features/project/update";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";
import { AppRoutes } from "../../../shared/model/services/appRoutes";

interface ProjectsTableWidgetProps extends TableProps<Project> {
  selectedRowColumnTitleOptions?: (projects: ProjectPreview[], onSuccess?: () => Promise<void>) => React.ReactNode;
}

export const ProjectsTableWidget: React.FC<ProjectsTableWidgetProps> = observer(function ProjectsTableWidget({
  selectedRowColumnTitleOptions
}: ProjectsTableWidgetProps) {
  const projectsTableModule = useProjectsTableModule();
  const { rows } = projectsTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => projectsTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 10);
  const [selectedRows, setSelectedRows] = React.useState<ProjectPreview[]>([]);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = React.useState("");

  const applySearch: (data: ProjectPreview[]) => ProjectPreview[] = (data: ProjectPreview[]) =>
    data.filter(project => project.name.toLowerCase().includes(searchValue.toLowerCase()));

  React.useEffect(() => {
    void loadFn();
  }, []);

  const extraColumns: TableProps<ProjectPreview>["columns"] = React.useMemo(
    () => [
      {
        title: "Действия",
        key: "actions",
        render: (project: ProjectPreview) => (
          <Row className="flex-row flex-nowrap gap-2" onClick={e => e.stopPropagation()}>
            <ProjectUpdateFeature.Icon disabled={project.deletedAt !== null} projectId={project.id} />
            {project.deletedAt === null ? (
              <ProjectDeleteFeature.Icon project={project} onSuccess={loadFn} />
            ) : (
              <ProjectRestoreFeature.Icon project={project} onSuccess={loadFn} />
            )}
          </Row>
        )
      }
    ],
    [loadFn]
  );

  return (
    <Flex vertical gap={4}>
      <Input value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Поиск по названию" />
      <ProjectView.Table
        virtual
        columns={extraColumns}
        onRow={record => ({
          onDoubleClick: () => navigate(AppRoutes.getProjectUrl(true, record.id))
        })}
        dataSource={convertDataToTableDataSource(applySearch(data))}
        loading={loading}
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
        rowSelection={{
          type: "checkbox",
          onChange: (_, rows) => setSelectedRows(rows),
          hideSelectAll: true,
          selectedRowKeys: selectedRows.map(project => project.id),
          columnTitle: selectedRowColumnTitleOptions?.(selectedRows, loadFn)
        }}
      />
    </Flex>
  );
});
