import { createBrowserRouter, Outlet } from "react-router-dom";
import { Sidebar } from "@frontend/widgets/sidebar";
import { PageSpin } from "@worksolutions/antd-react-components";

import { ViewerProvider } from "../entities/viewer/config";
import { AppRoutes } from "../shared/model/services/appRoutes";
import { Layout } from "../shared/ui/layout/index";
import { Header, HeaderProvider } from "../widgets/header/index";

export const browserRouter = createBrowserRouter([
  {
    path: "*",
    element: "Not Found"
  },
  {
    path: "/",
    element: (
      <ViewerProvider>
        <HeaderProvider>
          <Layout.Main content={<Outlet />} header={<Header />} sidebar={<Sidebar />} />
        </HeaderProvider>
      </ViewerProvider>
    ),
    children: [
      {
        path: AppRoutes.getRootUrl(),
        element: "home"
      },
      {
        path: AppRoutes.getProfileUrl(),
        lazy: async () => import("@frontend/pages/common/profile")
      },
      {
        path: AppRoutes.getUsersUrl(),
        lazy: async () => import("@frontend/pages/user/root")
      },
      {
        path: AppRoutes.getUserUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getCreateUserUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getUpdateUserUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getProjectsUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getTasksUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getTaskUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getDocumentsUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getDocumentUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getCustomersUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getCustomerUrl(),
        element: <PageSpin />
      }
    ]
  },
  {
    path: AppRoutes.getAuthUrl(),
    element: <Layout.Auth content={<Outlet />} />,
    children: [{ index: true, lazy: async () => import("@frontend/pages/common/auth/login") }]
  }
]);
