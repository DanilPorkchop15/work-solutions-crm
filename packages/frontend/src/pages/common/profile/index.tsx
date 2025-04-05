import React from "react";
import { useTitle } from "react-use";
import { Typography } from "antd";
import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout/index";
import { useHeader } from "../../../widgets/header/config";
import { ProfileWidget } from "../../../widgets/profile/index";

function ProfilePage() {
  useTitle(AppTitles.getProfileTitle());
  useHeader(<Typography.Title level={2}>Профиль</Typography.Title>);

  return (
    <Layout.Content>
      <ProfileWidget />
    </Layout.Content>
  );
}

export const Component = React.memo(ProfilePage);
