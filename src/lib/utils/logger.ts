import { isDevelopment } from './environment';
import { LOG_LEVELS, type LogLevel } from './constants';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown[];
}

class Logger {
  private formatLogEntry(level: LogLevel, message: string, data?: unknown[]): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
  }

  private log(level: LogLevel, message: string, ...args: unknown[]) {
    if (!isDevelopment) return;

    const entry = this.formatLogEntry(level, message, args);
    
    switch (level) {
      case LOG_LEVELS.ERROR:
        console.error(`[${entry.timestamp}] [${level.toUpperCase()}]`, message, ...(args || []));
        break;
      case LOG_LEVELS.WARN:
        console.warn(`[${entry.timestamp}] [${level.toUpperCase()}]`, message, ...(args || []));
        break;
      default:
        console.log(`[${entry.timestamp}] [${level.toUpperCase()}]`, message, ...(args || []));
    }
  }

  debug(message: string, ...args: unknown[]) {
    this.log(LOG_LEVELS.DEBUG, message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    this.log(LOG_LEVELS.ERROR, message, ...args);
  }

  info(message: string, ...args: unknown[]) {
    this.log(LOG_LEVELS.INFO, message, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    this.log(LOG_LEVELS.WARN, message, ...args);
  }
}

export const logger = new Logger();