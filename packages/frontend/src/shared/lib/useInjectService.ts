import { Container } from "typedi";

export const useInjectService = <T, U>(service: new (...args: U[]) => T): T => {
  return Container.get(service);
};
