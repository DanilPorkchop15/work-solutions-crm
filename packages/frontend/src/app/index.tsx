import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { PageSpin } from "@worksolutions/antd-react-components";
import { call } from "ramda";

import { browserRouter } from "./config";
import { postInstallHooks, preInstallHooks } from "./hooks";
import { withProviders } from "./providers";

import "./index.scss";

const App = React.memo(function App() {
  return <RouterProvider fallbackElement={<PageSpin />} router={browserRouter} />;
});

export function mountApp(): void {
  const root = document.getElementById("root");
  if (!root) throw new Error("root not found");

  preInstallHooks.forEach(call);

  const AppInstance = withProviders(App);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <AppInstance />
    </React.StrictMode>
  );

  postInstallHooks.forEach(call);
}
