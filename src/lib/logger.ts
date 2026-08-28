/**
 * Centralized Application Logger
 * Used for tracking server action failures, auth issues, and storage exceptions cleanly in Vercel logs.
 */

type LogLevel = 'info' | 'warn' | 'error';

export class ApplicationLogger {
  private static formatMessage(level: LogLevel, context: string, message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    return JSON.stringify({
      timestamp,
      level,
      context,
      message,
      ...(meta && { meta }),
    });
  }

  static info(context: string, message: string, meta?: any) {
    console.log(this.formatMessage('info', context, message, meta));
  }

  static warn(context: string, message: string, meta?: any) {
    console.warn(this.formatMessage('warn', context, message, meta));
  }

  static error(context: string, message: string, error?: any) {
    console.error(this.formatMessage('error', context, message, {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    }));
  }
}
