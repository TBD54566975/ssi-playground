const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');
const path = require('path');

const proxy = httpProxy.createProxyServer({});

let badges = []
let webhooksRecieved = []

const server = http.createServer((req, res) => {
  handleWebhookRoutes(req, res)
  handleIndexRoutes(req, res)
});

function handleWebhookRoutes(req, res) {
  if (req.url === "/webhook" && req.method === "POST") {

    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const jsonObject = JSON.parse(body);
      const formattedJsonString = JSON.stringify(jsonObject, null, 2);
      webhooksRecieved.push(formattedJsonString)

      const credentialSubject = jsonObject?.data?.credential?.credentialSubject ?? undefined;

      if (credentialSubject) {
        let svgBadge = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="45" stroke="black" stroke-width="3" fill="gold" />
        <circle cx="50" cy="50" r="35" stroke="black" stroke-width="2" fill="white" />
        <text x="50" y="55" font-family="Verdana" font-size="14" text-anchor="middle" alignment-baseline="central" fill="black">
            VC
        </text>
        </svg>`;
        badges.push(svgBadge)
      }

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Webhook received and processed');
    });
  }

  if (req.url === "/webhook" && req.method === "GET") {
    fs.readFile(path.join(__dirname, 'webhook.html'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading webhook.html');
        return;
      }

      data = data.replace("{WEBHOOKS}", webhooksRecieved.join(" <hr/> "));
      data = data.replace("{BADGES}", badges.join(" "));


      res.writeHead(200, { 'Content-Type': 'text/html' });

      res.end(data);
    });
  }
}

function handleIndexRoutes(req, res) {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
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

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }
}

server.listen(8081, '0.0.0.0', () => {
  console.log('Server listening on http://localhost:8081');
});
