import { readFileSync } from "fs";

export interface TokenConfig {
    SECRET_KEY: string;
}

export interface AppConfig {
    port :string | number | undefined;
}

export const tokenConfig: TokenConfig = {SECRET_KEY: "123456789"};
export const expiresIn: string = "1h";
export const userdb = JSON.parse(
    readFileSync("./users.json", {
      encoding: "utf-8",
    })
  );

const DEFAULT_PORT:number = 8080;
export const appConfig: AppConfig = {port: process.env.PORT ?? DEFAULT_PORT};