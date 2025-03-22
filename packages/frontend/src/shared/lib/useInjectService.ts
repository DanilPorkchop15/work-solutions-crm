import { container } from "tsyringe";

import "reflect-metadata";

export const useInjectService: <T>(service: Constructor<T>) => T = <T>(service: Constructor<T>): T => {
  return container.resolve(service);
};
