import { container } from "tsyringe";

type Constructor<T> = { new (...args: any[]): T };

export const useInjectService: <T>(service: Constructor<T>) => T = <T>(service: Constructor<T>): T => {
  return container.resolve(service);
};
