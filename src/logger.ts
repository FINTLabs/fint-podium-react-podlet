import log4js from 'log4js';
import { LOGGING_LEVEL } from './environment';

/**
 * Log4Js logger.
 */
export const log = log4js.getLogger();
log.level = LOGGING_LEVEL;

