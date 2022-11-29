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