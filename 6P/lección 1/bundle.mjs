import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(root, 'index.source.html');
const output = path.join(root, 'index.html');
let html = fs.readFileSync(source, 'utf8');
const mime = {'.webp':'image/webp','.ttf':'font/ttf'};

for (const file of fs.readdirSync(path.join(root, 'assets'))) {
  const ext = path.extname(file).toLowerCase();
  if (!mime[ext]) continue;
  const rel = `assets/${file}`;
  const data = fs.readFileSync(path.join(root, rel)).toString('base64');
  html = html.replaceAll(rel, `data:${mime[ext]};base64,${data}`);
}

fs.writeFileSync(output, html);
console.log(`Creado ${output} (${fs.statSync(output).size} bytes)`);
