import winstonLog from "../utils/logger/index.js";

process.on("exit", (code) => {
  winstonLog.INFO("el proceso terminó con código: " + code);
});

process.on("uncaughtException", (error) =>
  winstonLog.ERROR("An error has occurred: " + error.message)
);

winstonLog.INFO(process.pid);
process.pid();
process.exit(1);
