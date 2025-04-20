import React from "react";
import { useAsyncFn, useEffectOnce } from "react-use";
import { Flex, Spin } from "antd";
import { observer } from "mobx-react-lite";

import {
  Project,
  ProjectComment,
  ProjectCommentsTableModule,
  ProjectCommentView,
  useProjectCommentsTableModule,
  useProjectDetails
} from "../../../entities/project";
import {
  CreateProjectComment,
  DeleteProjectComment,
  RestoreProjectComment,
  UpdateProjectComment
} from "../../../features/project-comment";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";

export const ProjectCommentsWidget = observer(function ProjectCommentsTableContent() {
  const projectCommentsTableModule: ProjectCommentsTableModule = useProjectCommentsTableModule();
  const projectDetails: Project = useProjectDetails();

  const { rows } = projectCommentsTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => projectCommentsTableModule.load(), []);

  const handleSuccess = React.useCallback(() => {
    projectCommentsTableModule.load();
  }, [projectCommentsTableModule]);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 10);

  useEffectOnce(() => {
    void loadFn();
  });

  const renderCommentActions = React.useCallback(
    (comment: ProjectComment) => {
      if (comment.deletedAt) {
        return [<RestoreProjectComment key="restore" commentId={comment.id} onSuccess={handleSuccess} />];
      }

      return [
        <UpdateProjectComment key="edit" comment={comment} onSuccess={handleSuccess} />,
        <DeleteProjectComment key="delete" commentId={comment.id} onSuccess={handleSuccess} />
      ];
    },
    [handleSuccess]
  );

  return (
    <Flex vertical gap="middle">
      <CreateProjectComment projectId={projectDetails.id} onSuccess={handleSuccess} />

      {loading ? (
        <Flex justify="center" align="center" style={{ padding: 24 }}>
          <Spin />
        </Flex>
      ) : (
        <ProjectCommentView.Table
          dataSource={convertDataToTableDataSource(data)}
          loading={loading}
          onRow={record => ({
            style: {
              opacity: record.deletedAt ? 0.5 : 1,
              background: record.deletedAt ? "#f5f5f5" : "inherit"
            }
          })}
          pagination={{
            showSizeChanger: false,
            size: "small",
            position: ["bottomLeft"],
            showQuickJumper: true,
            responsive: true,
            showLessItems: true,
            current: currentPage,
            pageSize: pageSize
          }}
          columns={[
            {
              title: "Действия",
              key: "actions",
              width: 90,
              align: "right",
              render: (_, record) => (
                <Flex gap="small" justify="flex-end">
                  {renderCommentActions(record)}
                </Flex>
              )
            }
          ]}
        />
      )}
    </Flex>
  );
});
