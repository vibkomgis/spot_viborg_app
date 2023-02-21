const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/map.js') {
    fs.readFile('map.js', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  } else if (req.url === '/navigation.js') {
    fs.readFile('navigation.js', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  } else if (req.url === '/viborg-domkirke.html') {
    fs.readFile('viborg-domkirke.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  }  else if (req.url === '/viborg-stadion.html') {
    fs.readFile('viborg-stadion.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === '/viborgdomkirke.png') {
    fs.readFile('viborgdomkirke.png', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      }
    });
  } else if (req.url === '/viborgstadion.png') {
    fs.readFile('viborgstadion.png', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      }
    });
  } else if (req.url === '/icons/listIcon.png') {
    fs.readFile('icons/listIcon.png', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      }
    });
  } else if (req.url === '/icons/mapIcon.png') {
    fs.readFile('icons/mapIcon.png', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      }
    });
  } else if (req.url === '/global.css') {
    fs.readFile('global.css', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  } else if (req.url === '/places.css') {
    fs.readFile('places.css', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  } else if (req.url === '/sang.mp3') {
    fs.readFile('sang.mp3', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'audio/mpeg');
        res.end(data);
      }
    });
  }
  else {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
