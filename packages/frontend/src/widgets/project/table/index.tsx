import React from "react";
import { useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { DeleteFilled } from "@ant-design/icons";
import { ProjectPreview, useProjectsTableModule } from "@frontend/entities/project";
import { AccessCheck } from "@frontend/entities/viewer";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { paginationLocale, tableLocale } from "@worksolutions/antd-react-components";
import { Flex, Input, Row, Switch, type TableProps } from "antd";
import { observer } from "mobx-react-lite";

import { ProjectView } from "../../../entities/project/ui";
import { ProjectDeleteFeature } from "../../../features/project/delete";
import { ProjectRestoreFeature } from "../../../features/project/restore";
import { ProjectUpdateFeature } from "../../../features/project/update";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";
import { AppRoutes } from "../../../shared/model/services/appRoutes";

interface ProjectsTableWidgetProps extends TableProps<ProjectPreview> {
  selectedRowColumnTitleOptions?: (projects: ProjectPreview[], onSuccess?: () => Promise<void>) => React.ReactNode;
  showSearch?: boolean;
}

export const ProjectsTableWidget: React.FC<ProjectsTableWidgetProps> = observer(function ProjectsTableWidget({
  selectedRowColumnTitleOptions,
  showSearch,
  ...props
}: ProjectsTableWidgetProps) {
  const projectsTableModule = useProjectsTableModule();
  const { rows } = projectsTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => projectsTableModule.load(), []);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 10);
  const [selectedRows, setSelectedRows] = React.useState<ProjectPreview[]>([]);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = React.useState("");

  const [showDeleted, setShowDeleted] = React.useState(false);

  const applySearchAndFilter: (data: ProjectPreview[]) => ProjectPreview[] = (data: ProjectPreview[]) =>
    data
      .filter(project => project.name.toLowerCase().includes(searchValue.toLowerCase()))
      .filter(project => showDeleted || project.deletedAt === null);

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
    <Flex vertical gap={12}>
      {showSearch && (
        <Flex gap={12} align="center">
          <Input value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Поиск по названию" />
          <AccessCheck type="hide" roles={[Role.ADMIN, Role.MODERATOR]}>
            <Switch
              checked={showDeleted}
              onChange={setShowDeleted}
              unCheckedChildren={<DeleteFilled style={{ color: "salmon" }} />}
              size="default"
            />
          </AccessCheck>
        </Flex>
      )}
      <ProjectView.Table
        virtual
        columns={extraColumns}
        onRow={record => ({
          onDoubleClick: () => navigate(AppRoutes.getProjectUrl(true, record.id))
        })}
        dataSource={convertDataToTableDataSource(applySearchAndFilter(data))}
        loading={loading}
        rowClassName={record => (record.deletedAt === null ? "" : "line-through")}
        locale={tableLocale}
        pagination={{
          locale: paginationLocale,
          position: ["bottomLeft"],
          showQuickJumper: true,
          responsive: true,
          showLessItems: true,
          total: applySearchAndFilter(data).length,
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
        {...props}
      />
    </Flex>
  );
});
