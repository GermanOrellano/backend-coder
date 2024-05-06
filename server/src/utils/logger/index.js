import env from "../env.util.js";

const persistence = env.MODE || "PROD";

let winstonLog;

switch (persistence) {
  case "PROD":
    const { default: winstonProd } = await import("./winstonProd.util.js");
    winstonLog = winstonProd;
    break;
  default:
    const { default: winstonDev } = await import("./winstonDev.util.js");
    winstonLog = winstonDev;
    break;
}

export default winstonLog;
