import dotEnv from "dotenv";
dotEnv.config();

import App from "./app";
import { createServer } from "http";
import { Logger } from "./utils";

const PORT = process.env["PORT"] || 3000;
const app = new App();
const server = createServer(app.getApp());

server.listen(PORT, () => Logger.info("Server listening on port: "+PORT));