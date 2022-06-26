const templateMatch = require("./template-match");
const {workerData, parentPort} = require("worker_threads");

parentPort.postMessage(templateMatch(workerData));
