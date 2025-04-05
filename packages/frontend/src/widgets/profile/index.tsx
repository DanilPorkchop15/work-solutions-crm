import React from "react";
import { useHeader } from "@frontend/widgets/header";
import { Flex, Typography } from "antd";

import { useViewer, ViewerModel } from "../../entities/viewer";
import { LogoutFeature } from "../../features/auth/logout";
import { ViewerUpdateFeature } from "../../features/viewer/update";

export const ProfileWidget = React.memo(function Profile() {
  const viewer: ViewerModel = useViewer();

  useHeader(
    <Flex gap={36} align="center">
      <Typography.Title level={2}>Редактирование профиля</Typography.Title>
      <LogoutFeature isButton />
    </Flex>,
    [viewer]
  );
  return <ViewerUpdateFeature />;
});
