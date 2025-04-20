import React from "react";
import { useAsyncFn, useEffectOnce } from "react-use";
import { Flex, Spin } from "antd";
import { observer } from "mobx-react-lite";

import {
  Document,
  DocumentComment,
  DocumentCommentsTableModule,
  DocumentCommentView,
  useDocumentCommentsTableModule,
  useDocumentDetails
} from "../../../entities/document";
import {
  CreateDocumentComment,
  DeleteDocumentComment,
  RestoreDocumentComment,
  UpdateDocumentComment
} from "../../../features/document-comment";
import { convertDataToTableDataSource, useLocalTableOnChange } from "../../../shared/lib/tableUtils";

export const DocumentCommentsWidget = observer(function DocumentCommentsTableContent() {
  const documentCommentsTableModule: DocumentCommentsTableModule = useDocumentCommentsTableModule();
  const documentDetails: Document = useDocumentDetails();

  const { rows } = documentCommentsTableModule;
  const [{ loading }, loadFn] = useAsyncFn(async () => documentCommentsTableModule.load(), []);

  const handleSuccess = React.useCallback(() => {
    documentCommentsTableModule.load();
  }, [documentCommentsTableModule]);

  const { data, pageSize, currentPage, onChange } = useLocalTableOnChange(rows, 1, 10);

  useEffectOnce(() => {
    void loadFn();
  });

  const renderCommentActions = React.useCallback(
    (comment: DocumentComment) => {
      if (comment.deletedAt) {
        return [<RestoreDocumentComment key="restore" commentId={comment.id} onSuccess={handleSuccess} />];
      }

      return [
        <UpdateDocumentComment key="edit" comment={comment} onSuccess={handleSuccess} />,
        <DeleteDocumentComment key="delete" commentId={comment.id} onSuccess={handleSuccess} />
      ];
    },
    [handleSuccess]
  );

  return (
    <Flex vertical gap="middle">
      <CreateDocumentComment documentId={documentDetails.id} onSuccess={handleSuccess} />

      {loading ? (
        <Flex justify="center" align="center" style={{ padding: 24 }}>
          <Spin />
        </Flex>
      ) : (
        <DocumentCommentView.Table
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
