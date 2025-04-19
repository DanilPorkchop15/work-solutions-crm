import { isString } from "@worksolutions/utils";

export const ISODatePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

export const isIsoDate = (value: unknown): value is string => isString(value) && ISODatePattern.test(value);

export const formatToLocalDate: (date: string) => string = (date: string): string =>
  new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

export const formatToLocalDateTime: (date: string) => string = (date: string): string =>
  new Date(date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
