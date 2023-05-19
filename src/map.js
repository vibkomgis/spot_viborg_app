// Dette er 'steder' kortet 
const southWest = L.latLng(56.4394, 9.3444);
const northEast = L.latLng(56.4714, 9.4502);
const bounds = L.latLngBounds(southWest, northEast);

let mymap = L.map('map', {
   //maxBounds: bounds,
   //maxBoundsViscosity: 1.0,
   //minZoom: 13, // set minZoom to the same value as the initial zoom
   //maxZoom: 60 // set maxZoom to the same value as the initial zoom
}).setView([56.4507, 9.4109], 17); //13

const dftoken = '3ebc3a63849a43b46feb8203ab25f83c';
const myAttributionText = '&copy; <a target="_blank" href="https://dataforsyningen.dk/Vilkaar">SDFI</a>';


// Her tilføjes topo og ortofoto til kortet. 
// https://github.com/consbio/Leaflet.Basemaps
var basemaps = [
 L.tileLayer.wms('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 0,
  attribution: myAttributionText,
  iconURL: 'icons/topo.png'
}),
L.tileLayer.wms('https://api.dataforsyningen.dk/orto_foraar_DAF?ignoreillegallayers=TRUE', {
  attribution: myAttributionText,
  token: dftoken,
  layers: 'orto_foraar',
  format: 'image/png',
  maxZoom: 20,
  minZoom: 0,
  iconURL: 'icons/orto.png'
})
]
mymap.addControl(L.control.basemaps({
  basemaps: basemaps,
  tileX: 0,  // tile X coordinate
  tileY: 0,  // tile Y coordinate
  tileZ: 1   // tile zoom level
}));






// Start GPS
var lc = L.control.locate({
  locateOptions: {
    enableHighAccuracy: true
  },
  setView: false
}).addTo(mymap);
lc.start();

// troels fixer kortet
// https://stackoverflow.com/questions/53879753/leaflet-map-does-not-appear-correctly-until-resize
setTimeout(function () {
  mymap.invalidateSize(true);
}, 100);
function locationHashChanged() {
    if (window.location.hash === "#maps") {
        mymap.invalidateSize(true);
        $(".listButton").css("background-color","#343434");
        $(".mapButton").css("background-color","#004036");
    }
    else {
        $(".listButton").css("background-color","#004036");
        $(".mapButton").css("background-color","#343434");
    }
  }
window.onhashchange = locationHashChanged;


const dbName = "myDatabase";
const dbVersion = 1; 

let facilitiesdbName = 'facilitiesDB'
let facilitiesdbVersion = 1;


// Her hentes seværdighedsdata baseret på stien defineret i fetchJson.js
console.log("Dette er din nuværende stederData: " + stederData)
function fetchAndStoreData() {
const list = document.getElementById('myList');
while (list.firstChild) {
  list.removeChild(list.firstChild);
}
indexedDB.deleteDatabase(dbName);
fetch(stederData)
  .then(response => response.json())
  .then(pois => {
    console.log("Dette er din opdateret stederData: " + stederData)
    console.log(pois)
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
          objectStore.createIndex('handicap', 'handicap', { unique: false });
          objectStore.createIndex('audio', 'audio', { unique: false });

          
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
        
            // Tilføj elementer til liste
            const listItem = document.createElement('li');
            const thumbImg = document.createElement('img');
            thumbImg.src = poi.thumb;
            thumbImg.alt = poi.title;
        
            listItem.appendChild(thumbImg);
        
            const textNode = document.createTextNode(poi.title);
            listItem.appendChild(textNode);
        
            list.appendChild(listItem);

            
            listItem.addEventListener('click', function() {
              window.location.href = "public/poiPage.html?" +
              "id=" + encodeURIComponent(poi.id) +
              "&title=" + encodeURIComponent(poi.title) +
              "&text=" + encodeURIComponent(poi.text) +
              "&audio=" + encodeURIComponent(poi.audio) 
            });
            
          })

          // Tilføj markører og ruteberegning
            pois.forEach(poi => {
              // Erstat single quotes i json. \\ virker ikke
              poi.text = poi.text.replace(/(?<!\\)'/g, '`');
              poi.title = poi.title.replace(/(?<!\\)'/g, '`');
              poi.shortdescription = poi.shortdescription.replace(/(?<!\\)'/g, '`');
              console.log(poi.audio)
              
              // Hent ikoner til visning på kort
              let myIcon = L.icon({
                iconUrl: poi.icon.normal,
                iconSize: [38, 38],
                popupAnchor: [0, -15]
              });
              

              let lang = document.documentElement.lang;
              // Lav basismarkør
              let marker = L.marker([poi.location.lat, poi.location.lng], {icon: myIcon}).addTo(mymap)
              .bindPopup("<b>" + poi.title + "</b><br />" + poi.shortdescription + "<br/> <a href='public/poiPage.html?id=" + encodeURIComponent(poi.id) +"&title=" + encodeURIComponent(poi.title) + "&lang=" + lang + "&audio=" + encodeURIComponent(poi.audio) + "&text=" + encodeURIComponent(poi.text)+"'>"+ info + "</a>" + (poi.handicap ? "<br/><br>" + poi.handicap + "<br/><br/>" : "" ));

                  
          });
     };
  }});
}


// Her hentes facilitetsdata baseret på stien defineret i fetchJson.js
function fetchAndStoreFacilities() {
indexedDB.deleteDatabase(facilitiesdbName);
fetch(fetchFacilities)
  .then(response => response.json())
  .then(facis => {
    console.log(facis)
    const openRequest = indexedDB.open(facilitiesdbName, facilitiesdbVersion);

    openRequest.onupgradeneeded = function(event) {
      const db = event.target.result;

      // Objectstore
      const objectStore = db.createObjectStore('facilities', { keyPath: 'id' });

      // Datastruktur
      objectStore.createIndex('id', 'id', { unique: false });
      objectStore.createIndex('lat', 'lat', { unique: false });
      objectStore.createIndex('lng', 'lng', { unique: false });
      objectStore.createIndex('title', 'title', { unique: false });
      objectStore.createIndex('shortdescription', 'shortdescription', { unique: false });
      objectStore.createIndex('icon','icon', { unique: false });
      //objectStore.createIndex('text', 'text', { unique: false });

      // Tilføj data til objectstore
      facis.forEach(obj => objectStore.add(obj));
    };

    openRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction('facilities', 'readonly');
      const objectStore = transaction.objectStore('facilities');

      // Hent data fra objectstore
      const request = objectStore.getAll();
      request.onsuccess = function(event) {
        const facis = event.target.result;

        

        facis.forEach(faci => {
          let faciIcon = L.icon({
            iconUrl: faci.icon,
            iconSize: [38, 38],
            popupAnchor: [0, -15]
          });
          // Markører
          L.marker([faci.location.lat, faci.location.lng], {icon: faciIcon}).addTo(mymap)
            .bindPopup("<b>" + faci.title + "</b><br />" + faci.shortdescription);
        });
      };
    }});
  }


// Load event listener
window.addEventListener('load',() => {    
    fetchAndStoreData();
    fetchAndStoreFacilities() ;
});

// Fetch data event listener
window.addEventListener('fetchDataUpdated',() => {    
  fetchAndStoreData();
  fetchAndStoreFacilities() ;
});