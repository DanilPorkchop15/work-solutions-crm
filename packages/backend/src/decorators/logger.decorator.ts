import { LoggerService } from "@backend/app/logger/logger.service";

interface LoggerServiceClass {
  loggerService: LoggerService;
}

export function Logger(action: string, comment?: string): MethodDecorator {
  return function <T>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): void {
    const originalMethod: T | undefined = descriptor.value;

    if (typeof originalMethod !== "function") {
      throw new Error("LoggerDecorator can only be applied to methods.");
    }

    descriptor.value = function (this: LoggerServiceClass, ...args: any[]): unknown {
      if (!this.loggerService) {
        throw new Error("LoggerService is not available. Ensure it is injected into the class using this decorator.");
      }

      this.loggerService.log(action, comment);

      return originalMethod.apply(this, args);
    } as T;
  };
}
