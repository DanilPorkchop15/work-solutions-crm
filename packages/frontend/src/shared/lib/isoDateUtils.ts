import { isString } from "@worksolutions/utils";

export const ISODatePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

export const isIsoDate = (value: unknown): value is ISO => isString(value) && ISODatePattern.test(value);

export const formatToLocalDate: (date: ISO) => string = (date: ISO): string =>
  new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

export const formatToLocalDateTime: (date: ISO) => string = (date: ISO): string =>
  new Date(date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
