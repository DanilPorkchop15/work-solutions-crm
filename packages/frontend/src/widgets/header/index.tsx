import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeSwitcherButton } from "@frontend/shared/ui/theme";
import { Dropdown, type MenuProps, Typography } from "antd";
import { observer } from "mobx-react-lite";

import { UserView } from "../../entities/@common/user";
import { useViewer } from "../../entities/viewer";
import { LogoutFeature } from "../../features/auth/logout";
import { AppRoutes } from "../../shared/model/services";

import { useHeaderContext } from "./config";

const UserWidget = observer(function UserWidget() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const viewer = useViewer();

  const userWidgetItems: MenuProps["items"] = React.useMemo(
    () => [
      {
        label: (
          <Typography.Text onClick={() => navigate(AppRoutes.getProfileUrl(true), { relative: "path" })}>
            Профиль
          </Typography.Text>
        ),
        key: "0"
      },
      {
        type: "divider"
      },
      {
        label: <LogoutFeature />,
        key: "2"
      }
    ],
    [pathname]
  );

  return (
    <Dropdown menu={{ items: userWidgetItems }} trigger={["click"]}>
      <UserView.Avatar className="cursor-pointer ml-2" user={viewer.state} />
    </Dropdown>
  );
});

export const Header: React.FC = observer(function HeaderComponent() {
  const { node } = useHeaderContext();

  return (
    <div className="w-full flex justify-between p-4">
      <div>{node}</div>
      <div className="flex items-center">
        <ThemeSwitcherButton />
        <UserWidget />
      </div>
    </div>
  );
});

export { useHeader, HeaderProvider } from "./config";
