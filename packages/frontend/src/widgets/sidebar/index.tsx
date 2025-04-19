import React, { memo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppstoreOutlined, BookOutlined, HomeOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { useViewer, ViewerModel } from "@frontend/entities/viewer";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { string1 } from "@worksolutions/utils";
import { Layout, Menu, type MenuProps, Row } from "antd";
import { observer } from "mobx-react-lite";
import { memoizeWith } from "ramda";

import { AppRoutes } from "../../shared/model/services/appRoutes";
import { CrmLogo } from "../../shared/ui/crmLogo/index";

const menuItemRoutes: MenuProps["items"] = [
  {
    key: AppRoutes.getRootUrl(),
    label: <Link to={AppRoutes.getRootUrl()}>Главная</Link>,
    icon: <HomeOutlined />
  },
  {
    key: AppRoutes.getProjectsUrl(true),
    label: <Link to={AppRoutes.getProjectsUrl()}>Проекты</Link>,
    icon: <AppstoreOutlined />
  },
  {
    key: AppRoutes.getCustomersUrl(true),
    label: <Link to={AppRoutes.getCustomersUrl()}>Клиенты</Link>,
    icon: <TeamOutlined />
  },
  {
    key: AppRoutes.getDocumentsUrl(true),
    label: <Link to={AppRoutes.getDocumentsUrl()}>Документы</Link>,
    icon: <BookOutlined />
  },
  {
    key: AppRoutes.getUsersUrl(true),
    label: <Link to={AppRoutes.getUsersUrl()}>Пользователи</Link>,
    icon: <UserAddOutlined />
  }
];

const menuItems: (isAdmin: boolean) => MenuProps["items"] = isAdmin => {
  const items: MenuProps["items"] = [
    {
      type: "group",
      label: "ОСНОВНОЕ",
      children: [menuItemRoutes[0]]
    },
    {
      type: "divider"
    },
    {
      type: "group",
      label: "УПРЕВЛЕНИЕ ПРОЕКТАМИ",
      children: menuItemRoutes.slice(1, 3)
    },
    {
      type: "group",
      label: "ДОКУМЕНТООБОРОТ",
      children: [menuItemRoutes[3]]
    }
  ];

  if (isAdmin) {
    items.push(
      {
        type: "divider"
      },
      {
        type: "group",
        label: "УПРЕВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ",
        children: [menuItemRoutes[4]]
      }
    );
  }

  return items;
};

const findActiveKey: (pathname: string) => string | undefined = memoizeWith(string1, pathname => {
  let matchKey: string | undefined;

  for (const route of menuItemRoutes) {
    if (route?.key === pathname) {
      matchKey = route.key;
      break;
    }

    if (route?.key && pathname === route.key.toString()) {
      matchKey = String(route.key);
    }
  }

  return matchKey;
});

export const Sidebar: React.FC = observer(function Sidebar() {
  const { pathname } = useLocation();
  const activeKey: string | undefined = findActiveKey(pathname);
  const selectedKeys: string[] = activeKey ? [activeKey] : [];

  const viewer: ViewerModel = useViewer();

  return (
    <Layout.Sider width={300}>
      <Row className="mb-8 p-4">
        <CrmLogo linkPath={AppRoutes.getRootUrl()} />
      </Row>
      <Row>
        <Menu items={menuItems(viewer.state.role === Role.ADMIN)} mode="inline" selectedKeys={selectedKeys} />
      </Row>
    </Layout.Sider>
  );
});
