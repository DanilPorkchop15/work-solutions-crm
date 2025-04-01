import { createBrowserRouter, Outlet } from "react-router-dom";
import { PageSpin } from "@worksolutions/antd-react-components";

import { ViewerProvider } from "../entities/viewer/config";
import { AppRoutes } from "../shared/model/services/appRoutes";
import { Layout } from "../shared/ui/layout/index";
import { Header, HeaderProvider } from "../widgets/header/index";
import { Sidebar } from "../widgets/sidebar/index";

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
        lazy: async () => import("@frontend/pages/user/root"),
        children: [
          {
            path: AppRoutes.getCreateUserUrl(),
            lazy: async () => import("@frontend/pages/user/create")
          },
          {
            path: AppRoutes.getUpdateUserUrl(),
            lazy: async () => import("@frontend/pages/user/update")
          }
        ]
      },
      {
        path: AppRoutes.getUserUrl(),
        lazy: async () => import("@frontend/pages/user/details")
      },
      {
        path: AppRoutes.getProjectsUrl(),
        lazy: async () => import("@frontend/pages/project/root"),
        children: [
          {
            path: AppRoutes.getCreateProjectUrl(),
            lazy: async () => import("@frontend/pages/project/create")
          },
          {
            path: AppRoutes.getUpdateProjectUrl(),
            lazy: async () => import("@frontend/pages/project/update")
          }
        ]
      },
      {
        path: AppRoutes.getProjectUrl(),
        lazy: async () => import("@frontend/pages/project/details")
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
        lazy: async () => import("@frontend/pages/customer/root"),
        children: [
          {
            path: AppRoutes.getCreateCustomerUrl(),
            lazy: async () => import("@frontend/pages/customer/create")
          },
          {
            path: AppRoutes.getUpdateCustomerUrl(),
            lazy: async () => import("@frontend/pages/customer/update")
          }
        ]
      },
      {
        path: AppRoutes.getCustomerUrl(),
        lazy: async () => import("@frontend/pages/customer/details")
      }
    ]
  },
  {
    path: AppRoutes.getAuthUrl(),
    element: <Layout.Auth content={<Outlet />} />,
    children: [{ index: true, lazy: async () => import("@frontend/pages/common/auth/login") }]
  }
]);
