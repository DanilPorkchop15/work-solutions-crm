import React from "react";
import { ChangePasswordFeature } from "@frontend/features/auth/change-password";
import { Back } from "@frontend/shared/ui/back";
import { useHeader } from "@frontend/widgets/header";
import { Flex, Typography } from "antd";

import { useViewer, ViewerModel } from "../../entities/viewer";
import { LogoutFeature } from "../../features/auth/logout";
import { ViewerUpdateFeature } from "../../features/viewer/update";

export const ProfileWidget = React.memo(function Profile() {
  const viewer: ViewerModel = useViewer();

  useHeader(
    <Flex gap={24} align="center">
      <Back />
      <Typography.Title level={2}>Редактирование профиля</Typography.Title>
      <Flex gap={12} align="center">
        <LogoutFeature isButton />
        <ChangePasswordFeature.Button size="small" />
      </Flex>
    </Flex>,
    []
  );
  return <ViewerUpdateFeature />;
});
