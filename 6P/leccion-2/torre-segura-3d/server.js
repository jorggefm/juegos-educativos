const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const BASE_PARTS = [
  'v5/part01.htmlfrag',
  'v5/part02a.htmlfrag',
  'v5/part02b.htmlfrag',
  'v5/part02c.htmlfrag',
  'v5/part02d.htmlfrag',
  'v5/part03.htmlfrag',
  'v5/part04.htmlfrag',
  'v5/part05.htmlfrag'
];
const V7_PATCH = 'v7/patch.jsfrag';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function serveV7(res) {
  Promise.all([
    Promise.all(BASE_PARTS.map(relative => fs.promises.readFile(path.join(ROOT, relative), 'utf8'))),
    fs.promises.readFile(path.join(ROOT, V7_PATCH), 'utf8')
  ])
    .then(([parts, patch]) => {
      let html = parts.join('')
        .replace(
          '<title>Torre Segura 3D v4 Lite — Multi Edificio</title>',
          '<title>Torre Segura 3D — V7 Progressive Damage</title>'
        );

      // Inject V7 inside the existing IIFE so it can safely extend the V6 engine
      // without duplicating Babylon, the scene, or the simulation state.
      const closeIndex = html.lastIndexOf('})();');
      if (closeIndex < 0) throw new Error('Unable to locate game IIFE closure');
      html = html.slice(0, closeIndex) + '\n' + patch + '\n' + html.slice(closeIndex);

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Torre-Segura-Version': '7'
      });
      res.end(html);
    })
    .catch(err => {
      console.error('Unable to assemble V7:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Unable to load Torre Segura 3D V7');
    });
}

const server = http.createServer((req, res) => {
  const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const relative = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');

  if (relative === 'index.html') {
    serveV7(res);
    return;
  }

  const filePath = path.normalize(path.join(ROOT, relative));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (statErr, stat) => {
    if (statErr || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=3600'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Torre Segura 3D V7 listening on http://${HOST}:${PORT}`);
});
