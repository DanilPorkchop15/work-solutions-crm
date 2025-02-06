import { LoggerService } from "@backend/app/logger/logger.service";

export function Logger(action: string, comment: string): MethodDecorator {
  return function (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void {
    const originalMethod: unknown = descriptor.value;

    if (typeof originalMethod !== "function") {
      throw new Error("LoggerDecorator can only be applied to methods.");
    }

    descriptor.value = function (...args: any[]): unknown {
      const loggerService: LoggerService = LoggerService.getInstance();

      loggerService.log(action, comment);

      return originalMethod.apply(this, args) as unknown;
    };
  };
}
