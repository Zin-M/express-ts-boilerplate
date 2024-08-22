import dotenv from "dotenv";
dotenv.config();
import App from "./src/app";

const app = new App();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 9999;

app.start(PORT);
