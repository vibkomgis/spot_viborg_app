
// Start map
var mymap = L.map('map').setView([56.4534, 9.4029], 13);

// Set the bounds of Viborg, Denmark
const southWest = L.latLng(56.4394, 9.3444);
const northEast = L.latLng(56.4714, 9.4502);
const bounds = L.latLngBounds(southWest, northEast);


// Start GPS
var lc = L.control.locate({locateOptions: {enableHighAccuracy: true}}).addTo(mymap);
lc.start();


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);


  
  const dbName = "myDatabase";
  const dbVersion = 1; // Opdatér dbVersion for at tilføje ny data. Således skal brugeren ikke slette deres browser cache. 
  const openRequest = indexedDB.open(dbName, dbVersion);
  
  openRequest.onerror = function(event) {
    console.error("Database error: " + event.target.errorCode);
  };
  
  openRequest.onupgradeneeded = function(event) {
    const db = event.target.result;
  
   
    // Create an object store within the database to store your data
    const objectStore = db.createObjectStore('Sevaerdigheder', { keyPath: 'ID' });
  
    // Define the structure of the data to be stored
    objectStore.createIndex('Titel', 'Titel', { unique: false });
    objectStore.createIndex('Type', 'Type', { unique: false });
    objectStore.createIndex('Description', 'Description', { unique: false });
    objectStore.createIndex('ImageURL', 'ImageURL', { unique: false });
    objectStore.createIndex('AudioURL', 'AudioURL', { unique: false });
    objectStore.createIndex('LAT', 'LAT', { unique: false });
    objectStore.createIndex('LON', 'LON', { unique: false });
  
    // Add a row of data to the object store
    objectStore.add({
      ID: 1,
      Titel: 'Viborg Domkirke',
      Type: 'Kirke',
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ImageURL: '/images/viborgdomkirke.png',
      AudioURL: 'audio/viborgdomkirke_dk.mp3',
      LAT: 56.45053,
      LON: 9.4125
    })

    objectStore.add({
      ID: 2,
      Titel: 'Viborg Stadion',
      Type: 'Stadion',
      Description: 'Fodbold stadion', 
      ImageURL: 'images/viborgstadion.png',
      AudioURL: 'audio/viborgstadion.mp3',
      LAT: 56.45589,
      LON: 9.40207
  });
  };
  
  openRequest.onsuccess = function(event) {
    const db = event.target.result;
    console.log("Database opened successfully!");
  
    // Now you can query the database and retrieve the row you just added
    const storeName = "Sevaerdigheder";
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
  
    const request = store.getAll();
  
    request.onsuccess = function(event) {
      const rows = event.target.result;
      console.log(rows);
    
      // Loop through each row and create a marker on the map
      rows.forEach(function(row) {
          const list = document.getElementById('myList');
          list.classList.add('my-list-class'); // add a class to the list
          
          // Add the item to the list
          const listItem = document.createElement('li');

          // Add a click event listener to the list item that redirects the user to a new page
          listItem.addEventListener('click', function() {
            window.location.href = row.Titel.toLowerCase().replace(/\s+/g, '-') + '.html';
          });
          // Add a link to separate 'sevaerdigheder' pages
          const linkToPage = row.Titel.toLowerCase().replace(/\s+/g, '-') + '.html';
          // Add markers 
          L.marker([row.LAT, row.LON]).addTo(mymap)
        .bindPopup("<b>" + row.Titel + "</b><br />" + row.Description + "<br/><img src='" + row.ImageURL + "' width='200' /><br /><a href='" + linkToPage +"'>Hør mere her</a>");


          const img = document.createElement('img');
          img.src = row.ImageURL;
          img.classList.add('my-img-class'); // add a class to the img element
          listItem.appendChild(img);
          
          const title = document.createElement('span');
          title.innerText = row.Titel;
          title.classList.add('my-title-class'); // add a class to the title element
          listItem.appendChild(title);
          
          list.appendChild(listItem);


          


          
      });

      

    };


  }




const mapButton = document.getElementById('mapButton');
const listButton = document.getElementById('listButton');
mapButton.addEventListener('click', showMap);
listButton.addEventListener('click', showList);

function showMap() {
  const list = document.getElementById('myList');
  list.style.display = 'none';
  const mapShow = document.getElementById('map');
  mapShow.style.display = 'block';
}

function showList() {
  const map = document.getElementById('map');
  map.style.display = 'none';
  const list = document.getElementById('myList');
  list.style.display = 'block';
  
}

// Call the showMap() function by default when the page loads
window.addEventListener('DOMContentLoaded', showMap);


/*
function getDistance(origin, destination) {
  // return distance in meters
  var lon1 = toRadian(origin[1]),
      lat1 = toRadian(origin[0]),
      lon2 = toRadian(destination[1]),
      lat2 = toRadian(destination[0]);
  var deltaLat = lat2 - lat1;
  var deltaLon = lon2 - lon1;
  var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
  var c = 2 * Math.asin(Math.sqrt(a));
  var EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
}
function toRadian(degree) {
  return degree*Math.PI/180;
}
var distance = getDistance([56.4534, 9.4029], [56.4394, 9.3444])
console.log(distance)
console.log(lc)
console.log(lc.i)
*/

/*
L.Routing.control({
  waypoints: [
    L.latLng(56.45053, 9.4125),
    L.latLng(56.45589, 9.40207)
  ],
  routeWhileDragging: true,
  geocoder: false,
  showAlternatives: false,
  show: false,
  draggableWaypoints: false,
}).addTo(mymap);
*/