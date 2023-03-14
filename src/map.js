const southWest = L.latLng(56.4394, 9.3444);
const northEast = L.latLng(56.4714, 9.4502);
const bounds = L.latLngBounds(southWest, northEast);

let mymap = L.map('map', {
   //maxBounds: bounds,
   //maxBoundsViscosity: 1.0,
   //minZoom: 13, // set minZoom to the same value as the initial zoom
   //maxZoom: 60 // set maxZoom to the same value as the initial zoom
}).setView([56.4534, 9.4029], 13);


const dftoken = '3ebc3a63849a43b46feb8203ab25f83c';
const myAttributionText = '&copy; <a target="_blank" href="https://dataforsyningen.dk/Vilkaar">Styrelsen for Dataforsyning og Infrastruktur</a>';
/*
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);
*/
const toposkaermkortwms = L.tileLayer.wms('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);

// Ortofoto [WMS:orto_foraar]
const ortofotowms = L.tileLayer.wms('https://api.dataforsyningen.dk/orto_foraar_DAF?ignoreillegallayers=TRUE', {
  layers: 'orto_foraar',
  token: dftoken,
  format: 'image/png',
  attribution: myAttributionText
}).addTo(mymap);



const baseLayers = {
  "Ortofoto": ortofotowms,
  "Skærmkort": toposkaermkortwms
};


// Add layer control to map
L.control.layers(baseLayers).addTo(mymap);

// Start GPS
var lc = L.control.locate({locateOptions: {enableHighAccuracy: true}}).addTo(mymap);
lc.start();

const dbName = "myDatabase";
const dbVersion = 1; // Opdatér dbVersion for at tilføje ny data. Således skal brugeren ikke slette deres browser cache. 
// Angiv variabler til ruteberegning
let posLat, posLng;
let routingControl;
// Fetch JSON data
fetch('data/sevaerdighederData/da-short.json')
  .then(response => response.json())
  .then(pois => {
    fetch('data/sevaerdighederData/da-long.json')
      .then(response => response.json())
      .then(translations => {
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

        const openRequest = indexedDB.open(dbName, dbVersion);
        openRequest.onupgradeneeded = function(event) {
          const db = event.target.result;

          // Objectstore til seværdighedsdata
          const objectStore = db.createObjectStore('Sevaerdigheder', { keyPath: 'id' });

          // Datastruktur
          objectStore.createIndex('id', 'id', { unique: false });
          objectStore.createIndex('lat', 'lat', { unique: false });
          objectStore.createIndex('lng', 'lng', { unique: false });
          objectStore.createIndex('title', 'title', { unique: false });
          objectStore.createIndex('shortdescription', 'shortdescription', { unique: false });
          objectStore.createIndex('text', 'text', { unique: false });
          objectStore.createIndex('icon','icon', { unique: false });

          // Tilføj data til objectstore
          pois.forEach(obj => objectStore.add(obj));
        };

        openRequest.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction('Sevaerdigheder', 'readonly');
          const objectStore = transaction.objectStore('Sevaerdigheder');

          // Hent data fra objectstore
          const request = objectStore.getAll();
          request.onsuccess = function(event) {
            const pois = event.target.result;


          // Tilføj hver titel til en liste
          pois.forEach(function(poi) {
            const list = document.getElementById('myList');
            list.classList.add('sevaerdighederList'); // Tilføj class. Samme navn i global.css

            // Add the item to the list
            const listItem = document.createElement('li');
            const textNode = document.createTextNode(poi.title); 
            console.log(textNode)
            listItem.appendChild(textNode); 
            list.appendChild(listItem); // 

            listItem.addEventListener('click', function() {
              window.location.href = "public/poiPage.html?id=" + encodeURIComponent(poi.id) +"&title=" + encodeURIComponent(poi.title) + "&text=" + encodeURIComponent(poi.text);
            });
            
          })

          // Tilføj markører og ruteberegning
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

              // Hent ikoner til visning på kort
              let myIcon = L.icon({
                iconUrl: poi.icon.normal,
                iconSize: [38, 38],
                popupAnchor: [0, -15]
              });
              console.log(poi.icon.normal)

              // Lav basismarkør
              let marker = L.marker([poi.location.lat, poi.location.lng], {icon: myIcon}).addTo(mymap)
                          .bindPopup("<b>" + poi.title + "</b><br />" + poi.shortdescription + "<br/><a href='public/poiPage.html?id=" + encodeURIComponent(poi.id) +"&title=" + encodeURIComponent(poi.title) + "&text=" + encodeURIComponent(poi.text)+"'>Hør mere her</a>" + "<br/>");

              mymap.on('locationfound', (e) => {
                console.log(e.latlng);
                posLat = e.latlng.lat;
                posLng = e.latlng.lng;
              });
              
              // Eventlistener der fjerner rute til markør når ny markør klikkes 
              marker.on('click', function(e) {
                if (routingControl) {
                  mymap.removeControl(routingControl);
                }
                // Lav rute mellem GPS og den intereagerede markør
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
                  profile: 'foot', // Gør ingen forskel mellem foot og driving
                })
                .on('routesfound', function(e) {
                  let routes = e.routes;
                  let summary = routes[0].summary;
                  console.log("Distance: " + summary.totalDistance + " meters");
                  marker.bindPopup("<b>" + poi.title + "</b><br />" +
                  poi.shortdescription + "<br/>" +
                  "<a href='public/poiPage.html?id=" + encodeURIComponent(poi.id) +
                  "&title=" + encodeURIComponent(poi.title) +
                  "&text=" + encodeURIComponent(poi.text) +
                  "'>Hør mere her</a><br/><br/>" +
                  "<b>Afstand væk: " + (summary.totalDistance / 1000).toFixed(2) + " km</b>"
                  );
                })
                .addTo(mymap);
              });
                          
                // Event listener der fjerner rute til markør når kort klikes. 
                mymap.on('click', (e) => {
                  if (routingControl) {
                    mymap.removeControl(routingControl);
                  
           }}
       )});

     };
  }});
})


const mapButton = document.getElementById('mapButton');
const listButton = document.getElementById('listButton');
mapButton.style.backgroundColor = 'green';
listButton.style.backgroundColor = 'green';
mapButton.addEventListener('click', showMap);
listButton.addEventListener('click', showList);

function showMap() {
  const list = document.getElementById('myList');
  list.style.display = 'none';
  const mapShow = document.getElementById('map');
  mapShow.style.display = 'block';
  mapButton.style.backgroundColor = 'black';
  listButton.style.backgroundColor = 'green';
}

function showList() {
  const map = document.getElementById('map');
  map.style.display = 'none';
  const list = document.getElementById('myList');
  list.style.display = 'block';
  listButton.style.backgroundColor = 'black';
  mapButton.style.backgroundColor = 'green';
}

// Initialiser kortet som startside
window.addEventListener('DOMContentLoaded', showMap);