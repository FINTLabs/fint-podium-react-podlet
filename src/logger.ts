import log4js from 'log4js';
import { LOGGING_LEVEL } from './environment';

const log = log4js.getLogger();
log.level = LOGGING_LEVEL;

export default log;
