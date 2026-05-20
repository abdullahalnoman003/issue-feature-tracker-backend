import app from "./app";
import config from "./config";

const main = () =>{
    app.listen(config.port, () => {
  console.log(`DevIntel Server is Running at port : ${config.port}`)
})
}
main();