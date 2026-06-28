// Post-build: relocate the default locale (zh) from out/zh/** to out/** root,
// so URLs match the existing site exactly (zh at root, no prefix). The pages
// already link to root paths (hideLocale: 'default-locale'); this aligns the files.
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(process.cwd(), 'out');
const DEFAULT = 'zh';

function moveInto(srcDir, dstDir) {
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, entry.name);
    const d = path.join(dstDir, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(d, { recursive: true });
      moveInto(s, d);
    } else if (!fs.existsSync(d)) {
      fs.renameSync(s, d);
    }
  }
}

const zhDir = path.join(OUT, DEFAULT);
const zhHome = path.join(OUT, `${DEFAULT}.html`);
if (fs.existsSync(zhHome)) fs.renameSync(zhHome, path.join(OUT, 'index.html'));
if (fs.existsSync(zhDir)) {
  moveInto(zhDir, OUT);
  fs.rmSync(zhDir, { recursive: true, force: true });
}
console.log('flattened default locale (zh) to out/ root');
