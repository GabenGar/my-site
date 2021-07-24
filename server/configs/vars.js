import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "..", "..", ".env")
});

export const nodeEnv = process.env.NODE_ENV || "development";
export const serverPort = Number(process.env.BACKEND_PORT) || 3000;
