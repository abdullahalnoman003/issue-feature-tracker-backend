import app from "./app";
import config from "./config";
import { DBInit } from "./database";

const main = () =>{
  DBInit();
    app.listen(config.port, () => {
  console.log(`DevIntel Server is Running at port : ${config.port}`)
})
}
main();