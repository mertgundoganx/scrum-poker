// Checks that the React Compiler optimizes every component and hook in app/.
// When it can't handle something in a component (a `??=`, a function used
// before it is declared, a try/catch shape…) it silently leaves the whole
// component unoptimized: the build passes and the page just renders more.
// This runs the compiler the way the build does and fails on any such skip.
//
//   node scripts/check-compiler.mjs [files…]   (default: app/**/*.tsx)

import { globSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

// The Babel that Next.js runs the compiler with (a peer dependency of next).
const require = createRequire(import.meta.url);
const fromNext = createRequire(require.resolve('next/package.json'));
const babel = fromNext('@babel/core');
const compiler = require('babel-plugin-react-compiler');

const files = process.argv.length > 2 ? process.argv.slice(2) : globSync('app/**/*.tsx').sort();
const FAILED = new Set(['CompileError', 'PipelineError']);

let compiled = 0;
const skipped = [];
for (const file of files) {
  const events = [];
  babel.transformSync(readFileSync(file, 'utf8'), {
    filename: file,
    babelrc: false,
    configFile: false,
    code: false,
    parserOpts: { plugins: ['typescript', 'jsx'] },
    plugins: [[compiler.default ?? compiler, { panicThreshold: 'none', logger: { logEvent: (_file, event) => events.push(event) } }]],
  });
  for (const event of events) {
    if (event.kind === 'CompileSuccess') compiled++;
    if (!FAILED.has(event.kind)) continue;
    const detail = event.detail ?? {};
    const options = detail.options ?? detail;
    const line = (options.loc ?? detail.loc ?? event.fnLoc)?.start?.line ?? '?';
    const reason = [options.reason, options.description].filter(Boolean).join(': ') || String(event.data ?? event.kind);
    skipped.push(`${file}:${line}  ${[event.fnName, reason].filter(Boolean).join(': ')}`);
  }
}

if (skipped.length) {
  console.error(`The React Compiler skipped ${skipped.length} function(s):\n`);
  for (const s of skipped) console.error(`  ${s}`);
  process.exit(1);
}
console.log(`React Compiler: ${compiled} components and hooks optimized in ${files.length} files, none skipped.`);
