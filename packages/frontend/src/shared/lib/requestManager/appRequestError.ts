import type { AxiosError } from "axios";

import type { AppErrorValue } from "../appError";
import { AppError } from "../appError";

export class AppRequestError extends AppError {
  constructor(
    private readonly _error: { message: string; errors: Record<string, AppErrorValue> },
    public statusCode: number,
    public axiosError?: AxiosError<unknown, unknown>
  ) {
    super();
    this.setMessage(this._error.message);
    this.setErrors(this._error.errors);
  }

  public static isRequestError(data: unknown): data is AppRequestError {
    return data instanceof AppRequestError;
  }

  public static buildFromAxiosError(error: AxiosError): AppRequestError {
    return new AppRequestError({ message: error.message, errors: {} }, error.response?.status ?? -1, error);
  }
}
