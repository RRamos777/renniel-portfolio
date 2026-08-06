import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';

await import('./check-assets.mjs');

const output = new URL('./dist/', import.meta.url);
const publicDirectory = new URL('./public/', import.meta.url);

async function countFiles(directory) {
  if (!existsSync(directory)) return 0;

  let total = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    if (entry.isDirectory()) total += await countFiles(child);
    else if (entry.isFile()) {
      await stat(child);
      total += 1;
    }
  }
  return total;
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of ['index.html', 'styles.css', 'script.js']) {
  await cp(new URL(`./${file}`, import.meta.url), new URL(`./dist/${file}`, import.meta.url));
}

if (existsSync(publicDirectory)) {
  await cp(publicDirectory, output, { recursive: true });
}

const publicFileCount = await countFiles(publicDirectory);
const copiedPublicFileCount = await countFiles(output) - 3;

if (publicFileCount !== copiedPublicFileCount) {
  throw new Error(`Public asset copy failed: expected ${publicFileCount} files, found ${copiedPublicFileCount}.`);
}

console.log(`Copied ${copiedPublicFileCount} public assets.`);
console.log('Built static portfolio in dist/');
