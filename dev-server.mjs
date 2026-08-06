import http from 'node:http';
import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath (not `.pathname`) is required for Windows paths.
const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 5173);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
};

function parseRange(rangeHeader, fileSize) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader || '');
  if (!match) return null;

  let start = match[1] ? Number(match[1]) : 0;
  let end = match[2] ? Number(match[2]) : fileSize - 1;

  if (!match[1] && match[2]) {
    const suffixLength = Number(match[2]);
    start = Math.max(fileSize - suffixLength, 0);
    end = fileSize - 1;
  }

  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end < start || start >= fileSize) {
    return null;
  }

  return { start, end: Math.min(end, fileSize - 1) };
}

http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
    const candidate = normalize(join(root, relative));
    const publicCandidate = normalize(join(root, 'public', relative));

    if (!candidate.startsWith(root) || !publicCandidate.startsWith(root)) {
      throw new Error('Path escapes project root');
    }

    let file = candidate;
    let fileStats;
    try {
      fileStats = await stat(file);
    } catch {
      file = publicCandidate;
      fileStats = await stat(file);
    }

    if (!fileStats.isFile()) throw new Error('Not a file');

    const extension = extname(file).toLowerCase();
    const contentType = mime[extension] || 'application/octet-stream';
    const range = parseRange(req.headers.range, fileStats.size);

    if (range && contentType.startsWith('video/')) {
      const chunkSize = range.end - range.start + 1;
      res.writeHead(206, {
        'Content-Type': contentType,
        'Content-Length': chunkSize,
        'Content-Range': `bytes ${range.start}-${range.end}/${fileStats.size}`,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache',
      });
      if (req.method === 'HEAD') return res.end();
      createReadStream(file, range).pipe(res);
      return;
    }

    const headers = {
      'Content-Type': contentType,
      'Content-Length': fileStats.size,
      'Accept-Ranges': contentType.startsWith('video/') ? 'bytes' : 'none',
      'Cache-Control': 'no-cache',
    };
    res.writeHead(200, headers);
    if (req.method === 'HEAD') return res.end();
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}).listen(port, () => console.log(`Portfolio running at http://localhost:${port}`));
