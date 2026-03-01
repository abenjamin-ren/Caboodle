/**
 * Minimal ANSI color helpers - zero dependencies.
 * Respects NO_COLOR env var and non-TTY output.
 */

const enabled =
  !process.env.NO_COLOR &&
  process.stdout.isTTY !== false;

const wrap = (open, close) =>
  enabled ? (s) => `${open}${s}${close}` : (s) => s;

export const bold    = wrap("\x1b[1m",  "\x1b[22m");
export const dim     = wrap("\x1b[2m",  "\x1b[22m");
export const green   = wrap("\x1b[32m", "\x1b[39m");
export const yellow  = wrap("\x1b[33m", "\x1b[39m");
export const red     = wrap("\x1b[31m", "\x1b[39m");
export const cyan    = wrap("\x1b[36m", "\x1b[39m");
