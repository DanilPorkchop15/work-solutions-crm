/// <reference types="vite/client" />

type Constructor<T> = { new (): T };

type Guid = string;
type ISO = string;

type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? K : never;
}[keyof T];
