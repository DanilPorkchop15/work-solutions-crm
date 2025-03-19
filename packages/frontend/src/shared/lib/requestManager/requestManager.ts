/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
import { template } from "@worksolutions/utils";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import type Decoder from "jsonous";
import qs from "qs";
import { isNil } from "ramda";

import { AppRequestError } from "./appRequestError";

export enum METHODS {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete"
}

export class RequestManager {
  public static baseURL = "";

  public static beforeRequestMiddleware: ((data: { config: AxiosRequestConfig }) => void | Promise<void>)[] = [];

  public static beforeErrorMiddleware: ((data: {
    error: AppRequestError;
    config: AxiosRequestConfig;
    shareData: Record<string, unknown>;
  }) => AppRequestError | Promise<AppRequestError | null> | null)[] = [];

  private static async _applyAllBeforeRequestMiddleware(config: AxiosRequestConfig) {
    for (const middleware of RequestManager.beforeRequestMiddleware) {
      await middleware({ config });
    }
  }

  private static async _applyAllBeforeErrorMiddleware(error: AppRequestError, config: AxiosRequestConfig) {
    const shareData: Record<string, unknown> = {};
    for (const middleware of RequestManager.beforeErrorMiddleware) {
      const middlewareResult = await middleware({ error, config, shareData });
      if (!middlewareResult) break;

      error = middlewareResult;
    }

    return error;
  }

  private static async _makeRequest({
    url,
    method,
    requestConfig,
    requestData: { options = {}, urlParams, additionalQueryParams, body }
  }: Required<Pick<CreateRequest<unknown>, "url" | "method" | "requestConfig">> & {
    requestData: RequestData;
  }) {
    const requestData: AxiosRequestConfig = {
      url: urlParams ? template(url, urlParams) : url,
      method,
      data: body,
      baseURL: RequestManager.baseURL,
      headers: { accept: "application/json" },
      params: additionalQueryParams,
      paramsSerializer: params => qs.stringify(params)
    };

    if (requestConfig.contentType && requestData.headers) {
      requestData.headers["content-type"] = requestConfig.contentType;
    }

    if (options.progressReceiver) {
      requestData.onUploadProgress = function ({ loaded, total }) {
        if (!total) return;
        options.progressReceiver?.((loaded / total) * 100);
      };
    }

    try {
      await RequestManager._applyAllBeforeRequestMiddleware(requestData);
      const { data } = await axios<unknown>(requestData);
      return [{ requestData, response: data }, null] as const;
    } catch (axiosError) {
      return [
        null,
        { requestData, axiosError } as { requestData: AxiosRequestConfig; axiosError: AxiosError }
      ] as const;
    }
  }

  private static async _applyError(
    error: AppRequestError,
    axiosRequestConfig: AxiosRequestConfig,
    requestData: RequestData = {}
  ) {
    if (requestData.options?.disableBeforeErrorMiddlewares) return error;
    return RequestManager._applyAllBeforeErrorMiddleware(error, axiosRequestConfig);
  }

  public createRequest<DecoderValue = void>({
    url,
    method = METHODS.GET,
    requestConfig = {},
    serverDataDecoder
  }: CreateRequest<DecoderValue>) {
    return async function (requestData: RequestData = {}): Promise<DecoderValue> {
      const [requestResult, requestError] = await RequestManager._makeRequest({
        url,
        method,
        requestConfig,
        requestData
      });

      if (requestError)
        throw await RequestManager._applyError(
          AppRequestError.buildFromAxiosError(requestError.axiosError),
          requestError.requestData,
          requestData
        );

      if (isNil(requestResult) || !serverDataDecoder) return null as any;

      const [data, decoderError] = serverDataDecoder
        .decodeAny(requestResult.response)
        .cata<[DecoderValue, null] | [null, string]>({
          Ok: val => [val, null],
          Err: err => [null, err]
        });

      if (data) return data;
      throw await RequestManager._applyError(
        new AppRequestError({ message: `Response parsing error: ${decoderError}`, errors: {} }, -1),
        requestResult.requestData,
        requestData
      );
    };
  }
}

RequestManager.beforeErrorMiddleware.push(({ error }) => error);

interface CreateRequest<DecoderGenericType> {
  url: string;
  method?: METHODS;
  serverDataDecoder?: Decoder<DecoderGenericType>;
  requestConfig?: {
    contentType?: string;
  };
}

export interface RequestOptions {
  disableBeforeErrorMiddlewares?: boolean;
  progressReceiver?: (progress: number) => void;
}

interface RequestData {
  body?: unknown;
  additionalQueryParams?: Record<string, any>;
  options?: RequestOptions;
  urlParams?: Record<string, string | number>;
}
