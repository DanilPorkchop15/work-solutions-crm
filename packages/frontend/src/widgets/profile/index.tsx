import React from "react";
import { useViewer } from "@frontend/entities/viewer";
import { LogoutFeature } from "@frontend/features/auth/logout";
import { Button, Flex, Typography } from "antd";

export const Profile = React.memo(function Profile() {
  const viewer = useViewer();

  return (
    <>
      <Typography.Title className="block mb-4" level={3}>
        Редактирование профиля
      </Typography.Title>
      <Flex vertical justify="space-between" className="h-full">
        <Flex className="mt-4 w-full">
          <Flex vertical className="w-2/4">
            <Flex vertical>
              <Typography.Title level={5}>Имя</Typography.Title>
              <Typography.Paragraph>{viewer.state.fullName}</Typography.Paragraph>
            </Flex>
            <Flex vertical>
              <Typography.Title level={5}>Почта</Typography.Title>
              <Typography.Paragraph>{viewer.state.email}</Typography.Paragraph>
            </Flex>
          </Flex>
        </Flex>
        <div>
          <LogoutFeature isButton />
        </div>
      </Flex>
    </>
  );
});
