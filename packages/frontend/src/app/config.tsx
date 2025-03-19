import { createBrowserRouter, Outlet } from "react-router-dom";
import { AppRoutes } from "@frontend/shared/model/services";
import { Layout } from "@frontend/shared/ui/layout";
import { PageSpin } from "@worksolutions/antd-react-components";

// TODO: fix second render
export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout.Main content={<Outlet />} header={"bebra"} />,
    children: [
      {
        path: AppRoutes.getRootUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getAuthUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getProfileUrl(),
        element: <PageSpin />
      },
      {
        path: AppRoutes.getUsersUrl(),
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
      }
    ]
  },
  {
    path: "*",
    element: "Not Found"
  }
]);
