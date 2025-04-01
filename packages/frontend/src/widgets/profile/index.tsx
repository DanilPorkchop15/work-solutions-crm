import React from "react";
import { Flex, Typography } from "antd";

import { UserView } from "../../entities/@common/user/ui/index";
import { useViewer } from "../../entities/viewer/hooks";
import { ViewerModel } from "../../entities/viewer/model";
import { LogoutFeature } from "../../features/auth/logout/index";
import { UserUpdateFeature } from "../../features/user/update/index";

export const ProfileWidget = React.memo(function Profile() {
  const viewer: ViewerModel = useViewer();

  return (
    <>
      <Flex gap={36} style={{ marginBottom: 20 }} align="center">
        <Typography.Title level={2}>Редактирование профиля</Typography.Title>
        <LogoutFeature isButton />
      </Flex>
      <Flex vertical justify="space-between" gap={48} className="w-[50%]">
        <UserView.Avatar user={viewer.state} size={250} shape="square" />
        <UserUpdateFeature.Form />
      </Flex>
    </>
  );
});
