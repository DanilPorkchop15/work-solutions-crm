export const IS_PRODUCTION_MODE: boolean = import.meta.env.MODE === "production";
export const BASE_API_HOST: string = import.meta.env.VITE_APP_BACKEND || "http://localhost:3000";

console.info(import.meta.env);
