
var mymap = L.map('map').setView([56.4534, 9.4029], 13);

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
      ImageURL: 'viborgdomkirke.png',
      AudioURL: 'audio/viborgdomkirke_dk.mp3',
      LAT: 56.45053,
      LON: 9.4125
    })

    objectStore.add({
    ID: 2,
    Titel: 'Viborg Stadion',
    Type: 'Stadion',
    Description: 'Fodbold stadion', 
    ImageURL: 'viborgstadion.png',
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
        L.marker([row.LAT, row.LON]).addTo(mymap)
          .bindPopup("<b>" + row.Titel + "</b><br />" + row.Description + "<br/><img src='" + row.ImageURL + "' width='200' />");
    
          const list = document.getElementById('myList');
          list.classList.add('my-list-class'); // add a class to the list
          
          // Add the item to the list
          const listItem = document.createElement('li');

          // Add a click event listener to the list item that redirects the user to a new page
          listItem.addEventListener('click', function() {
            window.location.href = 'places.html#' + row.TITEL;
          });
          
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

L.control.locate().addTo(mymap);


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



