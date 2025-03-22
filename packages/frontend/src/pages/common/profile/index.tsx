import React from "react";
import { useTitle } from "react-use";
import { Typography } from "antd";
import { useHeader } from "@frontend/widgets/header";
import { AppTitles } from "@frontend/shared/model/services";
import { Layout } from "@frontend/shared/ui/layout";
import { Profile } from "@frontend/widgets/profile";

function ProfilePage() {
  useTitle(AppTitles.getProfileTitle());
  useHeader(<Typography.Title level={2}>Профиль</Typography.Title>);

  return (
    <Layout.Content className="h-auto flex flex-col">
      <Profile />
    </Layout.Content>
  );
}

export const Component = React.memo(ProfilePage);
