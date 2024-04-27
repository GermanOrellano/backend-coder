import winstonLog from "./logger/index.js";

process.on("exit", (code) => {
  winstonLog.INFO("el proceso terminó con código: " + code);
});

process.exit(1);
