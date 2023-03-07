// Start map
var mymap = L.map('map').setView([56.4534, 9.4029], 13);




// Start GPS
var lc = L.control.locate({locateOptions: {enableHighAccuracy: true}}).addTo(mymap);
lc.start();


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);






const dbName = "kirkeRute";
const dbVersion = 1;


fetch('/data/ruteData/da-kirke-rute.json')
  .then(response => response.json())
  .then(pois => {
    // Open a connection to your IndexedDB database
    const openRequest = indexedDB.open(dbName, dbVersion);

    openRequest.onupgradeneeded = function(event) {
      const db = event.target.result;

      // Create an object store within the database to store your data
      const objectStore = db.createObjectStore('kirkeRute', { keyPath: 'id' });

      // Define the structure of the data to be stored
      objectStore.createIndex('id', 'id', { unique: false });
      objectStore.createIndex('lat', 'lat', { unique: false });
      objectStore.createIndex('lng', 'lng', { unique: false });
      objectStore.createIndex('title', 'title', { unique: false });
      objectStore.createIndex('shortdescription', 'shortdescription', { unique: false });
      objectStore.createIndex('text', 'text', { unique: false });

      // Add data to the object store
      pois.forEach(obj => objectStore.add(obj));
    };

    openRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction('kirkeRute', 'readonly');
      const objectStore = transaction.objectStore('kirkeRute');

      // Retrieve data from the object store
      const request = objectStore.getAll();
      request.onsuccess = function(event) {
        const pois = event.target.result;

        pois.forEach(poi => {
          poi.text = poi.text.replace(/'/g, '');
          const linkToPage = poi.title.toLowerCase()
          .replace(/\.+/g, '')
          .replace(/\s+/g, '')
          .replace(/\-/g, '')
          .replace(/å/g, 'aa')
          .replace(/æ/g, 'ae')
          .replace(/ø/g, 'oe');

          // Create a marker on the map for each POI
          L.marker([poi.location.lat, poi.location.lng]).addTo(mymap)
          .bindPopup("<b>" + poi.title + "</b><br />" + poi.shortdescription + "<br/><a href='/public/poiPage.html?id=" + encodeURIComponent(poi.id) +"&title=" + encodeURIComponent(poi.title) + "&text=" + encodeURIComponent(poi.text)+"'>Hør mere her</a>");


          // Define an array to store the lat/lng coordinates of each point
          let coordsArray = [];

          // Loop through each POI and add its lat/lng coordinates to the array
          pois.forEach(poi => {
            const coords = L.latLng(poi.location.lat, poi.location.lng);
            coordsArray.push(coords);
          });

          // Create the routing control with the array of coordinates as the waypoints
          L.Routing.control({
            waypoints: coordsArray,
            routeWhileDragging: true,
            geocoder: false,
            showAlternatives: false,
            show: false,
            draggableWaypoints: false,
          }).addTo(mymap);
          console.log(poi.text)
        });
      };
    };
  })
  .catch(error => {
    console.error(error);
  });


  new L.GPX('/data/ruteData/gpx/domkirkens_bagside.gpx', {
    async: true,
  }).on('loaded', function(e) {
    mymap.fitBounds(e.target.getBounds());
  }).addTo(mymap);

/*
const testDist = calculateDistance(56.45053, 9.4125, 56.45589, 9.40207)
console.log(testDist)
*/