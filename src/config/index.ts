import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
});

const config = {
    port : process.env.PORT,
    connection : process.env.CONNECTION,
    secret : process.env.ACCESS_TOKEN_SECRET,
    refresh_secret: process.env.REFRESH_TOKEN_SECRET,
    bycrypt_round : Number( process.env.BYCR_ROUND)
}
export default config;