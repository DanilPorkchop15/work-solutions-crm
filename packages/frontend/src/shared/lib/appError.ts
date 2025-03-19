import { action, makeObservable, observable } from "mobx";

export type AppErrorValue = string | undefined;

export class AppError {
  @observable
  public message: string = "";

  @observable
  public errors: Record<string, AppErrorValue> = {};

  private readonly _errorsObservers: Set<() => void> = new Set();

  constructor() {
    makeObservable(this);
  }

  public static isAppError(value: unknown): value is AppError {
    return value instanceof AppError;
  }

  @action.bound
  public clearErrors(): void {
    this.message = "";
    this.errors = {};
  }

  @action.bound
  public setError(name: string, error: AppErrorValue): void {
    this.errors[name] = error;
    this._runErrorsObserver();
  }

  @action.bound
  public setErrors(errors: Record<string, AppErrorValue>): void {
    this.errors = errors;
    this._runErrorsObserver();
  }

  @action.bound
  public setMessage(message: string): void {
    this.message = message;
  }

  public hasErrors(): boolean {
    return Object.keys(this.errors).length !== 0;
  }

  public hasAnyError(): boolean {
    return this.hasErrors() || this.message !== "";
  }

  public getError(errorName: string): AppErrorValue {
    return this.errors[errorName];
  }

  public observeErrors = (callback: () => void): (() => void) => {
    this._errorsObservers.add(callback);
    return () => {
      this._errorsObservers.delete(callback);
    };
  };

  private _runErrorsObserver(): void {
    this._errorsObservers.forEach((func) => func());
  }
}
