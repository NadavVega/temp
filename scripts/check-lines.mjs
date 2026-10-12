import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const decoder = new TextDecoder('utf-8', { fatal: true });
let failed = false;
for (const file of new Set(files)) {
  if (file.endsWith('.md')) continue;
  const bytes = readFileSync(file);
  if (bytes.includes(0)) continue;
  let content;
  try { content = decoder.decode(bytes); } catch { continue; }
  const lines = content === '' ? 0 : content.split('\n').length - Number(content.endsWith('\n'));
  if (lines > 2000) {
    console.error(`${file}: ${lines} lines exceeds the 2,000-line limit`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log('All code and configuration files are within 2,000 lines.');
