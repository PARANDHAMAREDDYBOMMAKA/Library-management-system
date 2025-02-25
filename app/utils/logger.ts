import { createLogger, format, transports } from 'winston';
import path from 'path';

const logFilePath = process.env.LOG_FILE_PATH || path.join(process.cwd(), 'logs', 'app.log');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `[${timestamp}] [${level.toUpperCase()}] - ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: logFilePath })
    ]
});

export default logger;
