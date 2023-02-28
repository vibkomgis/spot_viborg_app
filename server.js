const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/src/map.js') {
    fs.readFile('src/map.js', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  } else if (req.url === '/src/navigation.js') {
    fs.readFile('src/navigation.js', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  } else if (req.url === '/src/calculateDistance.js') {
    fs.readFile('src/calculateDistance.js', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  } else if (req.url === '/src/ruteKirker.js') {
    fs.readFile('src/ruteKirker.js', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  } else if (req.url === '/data/sevaerdighederData/da-short.json') {
    fs.readFile('data/sevaerdighederData/da-short.json', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
      }
    });
  } else if (req.url === '/data/sevaerdighederData/da-long.json') {
    fs.readFile('data/sevaerdighederData/da-long.json', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
      }
    });
  } else if (req.url.startsWith('/public/poiPage.html')) {
    const id = req.url.split('?id=')[1];
    fs.readFile('public/poiPage.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        const modifiedData = data.toString().replace(/id="[^"]*"/g, `id="${id}"`);
        res.end(modifiedData);
      }
    });
  } else if (req.url === '/public/viborgdomkirke.html') {
    fs.readFile('public/viborgdomkirke.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === '/public/ruteKirker.html') {
    fs.readFile('public/ruteKirker.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  }  else if (req.url === '/public/about.html') {
    fs.readFile('public/about.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === '/public/ruteOversigt.html') {
    fs.readFile('public/ruteOversigt.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  }else if (req.url === '/public/sevaerdigheder.html') {
    fs.readFile('public/sevaerdigheder.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  }   else if (req.url === '/images/viborgdomkirke.png') {
    fs.readFile('images/viborgdomkirke.png', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      }
    });
  } else if (req.url === '/images/viborgHomepage.png') {
    fs.readFile('images/viborgHomepage.png', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      }
    });
  }else if (req.url === '/images/viborgstadion.png') {
    fs.readFile('images/viborgstadion.png', (err, data) => {
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
  } else if (req.url === '/images/kirkebanner.png') {
    fs.readFile('images/kirkebanner.png', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      }
    });
  } else if (req.url === '/images/monumentbanner.png') {
    fs.readFile('images/monumentbanner.png', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      }
    });
  } else if (req.url === '/images/hemmeligebanner.png') {
    fs.readFile('images/hemmeligebanner.png', (err, data) => {
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
  } else if (req.url === '/styles/global.css') {
    fs.readFile('styles/global.css', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  } else if (req.url === '/styles/places.css') {
    fs.readFile('styles/places.css', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  } else if (req.url === '/styles/rute.css') {
    fs.readFile('styles/rute.css', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  }else if (req.url === '/styles/sevaerdigheder.css') {
    fs.readFile('styles/sevaerdigheder.css', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  } else if (req.url === '/styles/about.css') {
    fs.readFile('styles/about.css', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  }else if (req.url === '/sang.mp3') {
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
