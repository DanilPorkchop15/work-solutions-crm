/// <reference types="vite/client" />

type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? K : never;
}[keyof T];

declare module "html2canvas" {
  const html2canvas: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;
  export default html2canvas;
}
