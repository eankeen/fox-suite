/**
 * general miscellaneous utility functions
 */
export function setup() {
  process.on('uncaughtException', (err) => console.error(err))
  process.on('unhandledRejection', (err) => console.error(err))
}
