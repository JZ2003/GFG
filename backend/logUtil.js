/**
 * logUtil.js
 * 
 * To use this logger, you need to import it and call getLogger with a label.
 * Example:
 * const logUtil = require('./logUtil');
 * const logger = logUtil.getLogger('myLabel');
 * logger.info('Hello world');
 * logger.error('Error');
 * logger.warn('Warning');
 * logger.debug('Debug');
 */

const { createLogger, format, transports } = require("winston");
const { combine, label, printf} = format;

const myFormat = printf(({ level, message, label }) => {
    return `[${label}] ${level}: ${message}`;
});

function getLogger(mylabel) {
    return logger = createLogger({
        format: combine(
            format.colorize(),
            label({ label: mylabel }),
            myFormat,
        ),
        transports: [new transports.Console()],
    });
}

module.exports = { getLogger };