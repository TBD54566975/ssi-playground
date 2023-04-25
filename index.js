const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');
const path = require('path');

const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  } else {
    const ext = path.extname(req.url);
    const filePath = path.join(__dirname, 'public', req.url);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        proxy.web(req, res, { target: process.env.API_URL || 'http://localhost:8080' });
        return;
      }

      let contentType = 'text/plain';
      if (ext === '.js') {
        contentType = 'text/javascript';
      } else if (ext === '.css') {
        contentType = 'text/css';
      } else if (ext === '.png') {
        contentType = 'image/png';
      } else if (ext === '.svg') {
        contentType = 'image/svg+xml';
      }

      res.writeHead(200, {'Content-Type': contentType});
      res.end(data);
    });
  }
});

server.listen(8081, () => {
  console.log('Server listening on http://localhost:8081');
});
