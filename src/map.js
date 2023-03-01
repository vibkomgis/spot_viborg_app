
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


// Fetch the JSON data
fetch('/data/sevaerdighederData/da-short.json')
  .then(response => response.json())
  .then(pois => {
    // Load the da-DK.json file
    fetch('/data/sevaerdighederData/da-long.json')
      .then(response => response.json())
      .then(translations => {
        // Replace references with the actual translations
        pois.forEach(poi => {
          Object.keys(poi).forEach(key => {
            const value = poi[key];
            if (typeof value === 'string' && value.startsWith('POI_')) {
              poi[key] = translations[value];
            } else if (typeof value === 'object') {
              Object.keys(value).forEach(subkey => {
                const subvalue = value[subkey];
                if (typeof subvalue === 'string' && subvalue.startsWith('POI_')) {
                  value[subkey] = translations[subvalue];
                }
              });
            }
          });
        });
        console.log(pois);
        // Now the pois array contains the actual translations

        // Open a connection to your IndexedDB database
        const openRequest = indexedDB.open('myDatabase', 1);

        openRequest.onupgradeneeded = function(event) {
          const db = event.target.result;

          // Create an object store within the database to store your data
          const objectStore = db.createObjectStore('Sevaerdigheder', { keyPath: 'id' });

          // Define the structure of the data to be stored

          objectStore.createIndex('lat', 'lat', { unique: false });
          objectStore.createIndex('lng', 'lng', { unique: false });
          objectStore.createIndex('title', 'title', { unique: false });
          objectStore.createIndex('shortdescription', 'shortdescription', { unique: false });
          // Add data to the object store
          pois.forEach(obj => objectStore.add(obj));
        };

        openRequest.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction('Sevaerdigheder', 'readonly');
          const objectStore = transaction.objectStore('Sevaerdigheder');

          // Retrieve data from the object store
          const request = objectStore.getAll();
          request.onsuccess = function(event) {
            const pois = event.target.result;

          

            pois.forEach(poi => {
              const linkToPage = poi.title.toLowerCase()
              .replace(/\.+/g, '')
              .replace(/\s+/g, '')
              .replace(/\-/g, '')
              .replace(/å/g, 'aa')
              .replace(/æ/g, 'ae')
              .replace(/ø/g, 'oe')
              ;
              console.log(linkToPage)
              // Create a marker on the map for each POI
              L.marker([poi.location.lat, poi.location.lng]).addTo(mymap)
              .bindPopup("<b>" + poi.title + "</b><br />" + poi.shortdescription + "<br/><a href='/public/poiPage.html?id=" + encodeURIComponent(linkToPage) +"'>Hør mere her</a>");

               
              

            });
          };
        };
      });
  });




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


