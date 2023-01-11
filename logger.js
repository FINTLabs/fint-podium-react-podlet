
const log4js = require("log4js");
const {LOGGING_LEVEL} = require("./environment");
const log = log4js.getLogger();

log.level = LOGGING_LEVEL;

module.exports =  log;
