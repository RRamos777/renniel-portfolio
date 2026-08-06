import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname } from 'node:path';

const sourceFiles = ['index.html', 'script.js', 'styles.css'];
const assetPattern = /["'(]\/([A-Za-z0-9_./&-]+\.(?:css|js|png|jpe?g|webp|gif|svg|mp4|webm|mov))/gi;
const references = new Set();

for (const sourceFile of sourceFiles) {
  const contents = await readFile(new URL(`./${sourceFile}`, import.meta.url), 'utf8');
  for (const match of contents.matchAll(assetPattern)) references.add(match[1]);
}

const missing = [];
const optionalVideos = [];
for (const reference of references) {
  const extension = extname(reference).toLowerCase();
  const isSourceFile = extension === '.css' || extension === '.js';
  const fileUrl = new URL(isSourceFile ? `./${reference}` : `./public/${reference}`, import.meta.url);
  if (existsSync(fileUrl)) continue;

  if (reference.startsWith('videos/')) optionalVideos.push(`/${reference}`);
  else missing.push(`/${reference}`);
}

if (missing.length > 0) {
  console.error('Missing required local assets:');
  missing.forEach((asset) => console.error(`- ${asset}`));
  process.exitCode = 1;
  throw new Error(`Asset check failed with ${missing.length} missing required file(s).`);
}

console.log(`Checked ${references.size} referenced local assets.`);
if (optionalVideos.length > 0) {
  console.log(`Portfolio video galleries are ready for ${optionalVideos.length} optional video file(s):`);
  optionalVideos.forEach((asset) => console.log(`- add ${asset}`));
} else {
  console.log('All referenced video files are present.');
}
