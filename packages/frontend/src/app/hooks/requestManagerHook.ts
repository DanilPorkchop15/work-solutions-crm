/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirect } from "react-router-dom";
import { antdServices } from "@frontend/shared/model/services";
import { isPureObject, isString } from "@worksolutions/utils";
import { container } from "tsyringe";

import { BASE_API_HOST, IS_PRODUCTION_MODE } from "../../shared/config/const";
import { AppErrorValue } from "../../shared/lib/appError";
import { AppRequestError } from "../../shared/lib/requestManager/appRequestError";
import { RequestManager } from "../../shared/lib/requestManager/requestManager";
import { AppRoutes } from "../../shared/model/services/appRoutes";
import { CookiesStore } from "../../shared/model/services/cookies";

import type { InstallationHook } from "./interfaces";

export const requestManagerHook: InstallationHook = () => {
  RequestManager.baseURL = BASE_API_HOST;

  const cookiesStore: CookiesStore = container.resolve(CookiesStore);

  RequestManager.beforeRequestMiddleware.push(({ config }) => {
    const token: string | undefined = cookiesStore.get("accessToken");
    if (!token || !config.headers) return;
    if (config.url?.startsWith("/auth")) return;
    config.headers.Authorization = token;
  });

  RequestManager.beforeErrorMiddleware.push(({ error }) => {
    if (error.statusCode === -1) {
      console.error(error);
      return null;
    }

    return error;
  });

  RequestManager.beforeErrorMiddleware.push(({ error }) => {
    if (error.statusCode !== 401) return error;
    redirect(AppRoutes.getAuthUrl());
    return null;
  });

  RequestManager.beforeErrorMiddleware.push(({ error, shareData }) => {
    try {
      if (!error.axiosError?.response?.data) return error;
      // @ts-ignore
      const { message: errors } = error.axiosError.response.data;
      if (isString(errors)) {
        shareData.decoded = true;
        return new AppRequestError({ message: errors, errors: {} }, error.statusCode, error.axiosError);
      }

      if (!errors || !isPureObject(errors) || Object.keys(errors).length === 0) return error;

      shareData.decoded = true;
      return new AppRequestError(
        {
          message: error.message,
          errors: Object.fromEntries(
            Object.entries(errors).map(([fieldName, err]: [string, unknown]) => [
              fieldName,
              isString(err) ? err : JSON.stringify(err)
            ])
          )
        },
        error.statusCode,
        error.axiosError
      );
    } catch (e) {
      /* empty */
    }

    return error;
  });

  RequestManager.beforeErrorMiddleware.push(({ error, shareData }) => {
    if (!shareData.decoded) return error;

    if (error.hasErrors()) {
      const errors: [string, AppErrorValue][] = Object.entries(error.errors);
      errors.forEach(([errorKey, errorText]: [string, AppErrorValue]) =>
        antdServices.notification.error({ message: `Ошибка при отправке запроса. Поле «${errorKey}»: ${errorText}` })
      );
    } else {
      antdServices.notification.error({ message: `Ошибка при отправке запроса: «${error.message}»` });
    }

    return null;
  });

  if (IS_PRODUCTION_MODE) return;

  RequestManager.beforeErrorMiddleware.push(({ error, config }) => {
    antdServices.notification.error({
      message: `${config.method?.toUpperCase()} ${config.url} --- ${error.message}`
    });
    return null;
  });
};
