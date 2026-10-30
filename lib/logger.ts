import 'server-only';
import pino from 'pino';

/**
 * Errors as logged: type, message, stack and code, nothing else. When Redis
 * refuses a write, ioredis attaches the whole command to the error (and to
 * each of a failed transaction's `previousErrors`), and its arguments are the
 * room as stored (names, stories, votes): the logs hold room codes and ids,
 * never room content.
 */
function errorWithoutCommand(err: unknown) {
  const { type, message, stack, code } = pino.stdSerializers.err(err as Error) as Record<string, unknown>;
  return { type, message, stack, ...(code !== undefined && { code }) };
}

const logger = pino({
  level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  serializers: { err: errorWithoutCommand },
  ...(process.env.NODE_ENV !== 'production' && {
    transport: {
      target: 'pino/file',
      options: { destination: 1 }, // stdout
    },
    formatters: {
      level(label) {
        return { level: label };
      },
    },
  }),
});

export default logger;

// Shortcut child loggers for common modules
export const roomLogger = logger.child({ module: 'room' });
export const dbLogger = logger.child({ module: 'db' });
