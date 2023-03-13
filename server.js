const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === 'src/map.js') {
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
  } else if (req.url === 'src/navigation.js') {
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
  } else if (req.url === 'src/goBack.js') {
    fs.readFile('src/goBack.js', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  } else if (req.url === 'src/fetchSevaerdigheder.js') {
    fs.readFile('src/fetchSevaerdigheder.js', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  } else if (req.url === 'src/calculateDistance.js') {
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
  } else if (req.url === 'src/ruteKirker.js') {
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
  } else if (req.url === 'data/sevaerdighederData/da-short.json') {
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
  } else if (req.url === 'data/sevaerdighederData/da-long.json') {
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
  } else if (req.url === 'data/ruteData/da-kirke-rute.json') {
    fs.readFile('data/ruteData/da-kirke-rute.json', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
      }
    });
  }else if (req.url.startsWith('public/poiPage.html')) {
    fs.readFile('public/poiPage.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === 'public/viborgdomkirke.html') {
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
  } else if (req.url === 'public/ruteKirker.html') {
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
  }  else if (req.url === 'public/about.html') {
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
  } else if (req.url === 'public/ruteOversigt.html') {
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
  }else if (req.url === 'public/sevaerdigheder.html') {
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
  }   else if (req.url === 'images/viborgdomkirke.png') {
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
  } else if (req.url === 'images/intro.jpg') {
    fs.readFile('images/intro.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpg');
        res.end(data);
      }
    });
  } else if (req.url === 'images/viborgHomepage.png') {
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
  }else if (req.url === 'images/viborgstadion.png') {
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
  } else if (req.url === 'icons/listIcon.png') {
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
  } else if (req.url === 'images/kirkebanner.png') {
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
  } else if (req.url === 'images/monumentbanner.png') {
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
  } else if (req.url === 'images/hemmeligebanner.png') {
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
  } else if (req.url === 'icons/mapIcon.png') {
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
  } else if (req.url === 'icons/steder.svg') {
    fs.readFile('icons/steder.svg', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/svg+xml');
        res.end(data);
      }
    });
  }else if (req.url === 'icons/rute.svg') {
    fs.readFile('icons/rute.svg', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/svg+xml');
        res.end(data);
      }
    });
  } else if (req.url === 'icons/icon_poi_art.svg') {
    fs.readFile('icons/icon_poi_art.svg', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/svg+xml');
        res.end(data);
      }
    });
  } else if (req.url === 'icons/icon_poi_church.svg') {
    fs.readFile('icons/icon_poi_church.svg', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/svg+xml');
        res.end(data);
      }
    });
  } else if (req.url === 'icons/icon_poi_hidden_places.svg') {
    fs.readFile('icons/icon_poi_hidden_places.svg', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/svg+xml');
        res.end(data);
      }
    });
  }else if (req.url.startsWith('images/pois/')) {
    const fileName = req.url.split('/').pop(); // extract the file name from the URL
    if (fileName.match(/^\d+\.jpg$/)) { // make sure the file name matches the pattern
      fs.readFile(`images/pois/${fileName}`, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'image/jpg');
          res.end(data);
        }
      });
    } else {
      res.statusCode = 400; // bad request
      res.end('Invalid file name.');
    }
  } else if (req.url.startsWith('data/sevaerdighederData/audio/da-DK/')) {
    const fileName = req.url.split('/').pop(); // extract the file name from the URL
    if (fileName.match(/^\d+\.mp3$/)) { // make sure the file name matches the pattern
      fs.readFile(`data/sevaerdighederData/audio/da-DK/${fileName}`, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'audio/mpeg');
          res.end(data);
        }
      });
    } else {
      res.statusCode = 400; // bad request
      res.end('Invalid file name.');
    }
  }else if (req.url === 'styles/global.css') {
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
  } else if (req.url === 'styles/places.css') {
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
  } else if (req.url === 'styles/rute.css') {
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
  }else if (req.url === 'styles/sevaerdigheder.css') {
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
  } else if (req.url === 'styles/about.css') {
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
  } else if (req.url === 'data/ruteData/gpx/domkirkens_bagside.gpx') {
    fs.readFile('data/ruteData/gpx/domkirkens_bagside.gpx', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/gpx+xml');
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
