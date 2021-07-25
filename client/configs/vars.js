const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "..", "..", ".env")
})

const nodeEnv = process.env.NODE_ENV || "development";
const serverPort = Number(process.env.BACKEND_PORT) || 3000;
const siteOrigin = process.env.WEBSITE_ORIGIN || "http://localhost:3000";
const outputPath = process.env.FRONTEND_OUTPUT_PATH || path.resolve(__dirname, "..", "dist");

module.exports = {
  nodeEnv,
  serverPort,
  siteOrigin,
  outputPath
}
