import React from "react";
import { Flex, Typography } from "antd";

import { useViewer, ViewerModel } from "../../entities/viewer";
import { LogoutFeature } from "../../features/auth/logout";
import { ViewerUpdateFeature } from "../../features/viewer/update";

export const ProfileWidget = React.memo(function Profile() {
  const viewer: ViewerModel = useViewer();

  return (
    <>
      <Flex gap={36} style={{ marginBottom: 20 }} align="center">
        <Typography.Title level={2}>Редактирование профиля</Typography.Title>
        <LogoutFeature isButton />
      </Flex>
      <ViewerUpdateFeature />
    </>
  );
});
