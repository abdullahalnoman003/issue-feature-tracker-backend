import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
});

const config = {
    port : process.env.PORT,
}
export default config;