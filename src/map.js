const southWest = L.latLng(56.4394, 9.3444);
const northEast = L.latLng(56.4714, 9.4502);
const bounds = L.latLngBounds(southWest, northEast);

var mymap = L.map('map', {
  // maxBounds: bounds,
  // maxBoundsViscosity: 1.0,
  // minZoom: 13, // set minZoom to the same value as the initial zoom
  // maxZoom: 60 // set maxZoom to the same value as the initial zoom
}).setView([56.4534, 9.4029], 13);



//const dftoken = '3ebc3a63849a43b46feb8203ab25f83c';
// const myAttributionText = '&copy; <a target="_blank" href="https://dataforsyningen.dk/Vilkaar">Styrelsen for Dataforsyning og Infrastruktur</a>';
// const toposkaermkortwmts = L.tileLayer('https://api.dataforsyningen.dk/topo_skaermkort_wmts_DAF?service=WMTS&request=GetTile&version=1.3.0&Layer=topo_skaermkort&style=default&format=image/png&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}&token=' + dftoken, {
//   minZoom: 0,
//   maxZoom: 13,
//   attribution: myAttributionText,
//   crossOrigin: true,
//   zoom: function (data) {
//     return data.z;
//   }
// }).addTo(mymap);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);

// Start GPS
var lc = L.control.locate({locateOptions: {enableHighAccuracy: true}}).addTo(mymap);
lc.start();




const dbName = "myDatabase";
const dbVersion = 1; // Opdatér dbVersion for at tilføje ny data. Således skal brugeren ikke slette deres browser cache. 


// Declare posLat and posLng variables in a higher scope
let posLat, posLng;
let routingControl;
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
            const longDescription = pois.find(item => item.text === poi.text);
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
        
        mymap.on('locationfound', (e) => {
          console.log(e.latlng);
          posLat = e.latlng.lat;
          posLng = e.latlng.lng;
        })

        const openRequest = indexedDB.open(dbName, dbVersion);

        openRequest.onupgradeneeded = function(event) {
          const db = event.target.result;

          // Create an object store within the database to store your data
          const objectStore = db.createObjectStore('Sevaerdigheder', { keyPath: 'id' });

          // Define the structure of the data to be stored
          objectStore.createIndex('id', 'id', { unique: false });
          objectStore.createIndex('lat', 'lat', { unique: false });
          objectStore.createIndex('lng', 'lng', { unique: false });
          objectStore.createIndex('title', 'title', { unique: false });
          objectStore.createIndex('shortdescription', 'shortdescription', { unique: false });
          objectStore.createIndex('text', 'text', { unique: false });
          objectStore.createIndex('icon','icon', { unique: false });
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
              poi.text = poi.text.replace(/'/g, '');
              const linkToPage = poi.title.toLowerCase()
              .replace(/\.+/g, '')
              .replace(/\s+/g, '')
              .replace(/\-/g, '')
              .replace(/å/g, 'aa')
              .replace(/æ/g, 'ae')
              .replace(/ø/g, 'oe')
              ;

              // Create a new icon
              let myIcon = L.icon({
                iconUrl: '/' + poi.icon.normal,
                iconSize: [38, 38],
                popupAnchor: [0, -15]
              });
              console.log(poi.icon.normal)
              // Create the marker with the new icon
              let marker = L.marker([poi.location.lat, poi.location.lng], {icon: myIcon}).addTo(mymap)
                          .bindPopup("<b>" + poi.title + "</b><br />" + poi.shortdescription + "<br/><a href='/public/poiPage.html?id=" + encodeURIComponent(poi.id) +"&title=" + encodeURIComponent(poi.title) + "&text=" + encodeURIComponent(poi.text)+"'>Hør mere her</a>" + "<br/>");

                          

              // Add click event listener to the marker
              marker.on('click', function(e) {
                // Remove the routing control if it already exists
                if (routingControl) {
                  mymap.removeControl(routingControl);
                }

                
                // Create a routing control with the GPS user's location and the clicked marker as waypoints
                routingControl = L.Routing.control({
                  waypoints: [
                    L.latLng(posLat, posLng),
                    L.latLng(poi.location.lat, poi.location.lng),
                  ],
                  createMarker: function(i, waypoint, n) {
                    return null;
                  },
                  routeWhileDragging: true,
                  geocoder: false,
                  showAlternatives: false,
                  show: true,
                  draggableWaypoints: false,
                })
                .on('routesfound', function(e) {
                  let routes = e.routes;
                  let summary = routes[0].summary;
                  console.log("Distance: " + summary.totalDistance + " meters");
                  marker.bindPopup("<b>" + poi.title + "</b><br />" +
                  poi.shortdescription + "<br/>" +
                  "<a href='/public/poiPage.html?id=" + encodeURIComponent(poi.id) +
                  "&title=" + encodeURIComponent(poi.title) +
                  "&text=" + encodeURIComponent(poi.text) +
                  "'>Hør mere her</a><br/><br/>" +
                  "<b>Afstand væk: " + (summary.totalDistance / 1000).toFixed(2) + " km</b>"
                );
            
            
                })
                .addTo(mymap);
                
              });
            });

            // Add a click event listener to the map to remove the routing control when a new waypoint is clicked
            mymap.on('click', (e) => {
              if (routingControl) {
                mymap.removeControl(routingControl);
        }
      });

    };
  }});
})



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


