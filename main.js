



var mymap = L.map('map').setView([56.4534, 9.4029], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);


  
  const dbName = "myDatabase";
  const dbVersion = 1;
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
      ImageURL: './images/viborgdomkirke.png',
      AudioURL: 'audio/viborgdomkirke_dk.mp3',
      LAT: 56.45053,
      LON: 9.4125
    });
  };
  
  openRequest.onsuccess = function(event) {
    const db = event.target.result;
    console.log("Database opened successfully!");
  
    // Now you can query the database and retrieve the row you just added
    const storeName = "Sevaerdigheder";
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
  
    const request = store.get(1);
  
    request.onsuccess = function(event) {
      const row = event.target.result;
      console.log(row);
      L.marker([row.LAT, row.LON]).addTo(mymap)
      .bindPopup("<b>" + row.Titel + "</b><br />" + row.Description + "<br/><img src='" + row.ImageURL + "' width='200' />");
    };
  };

// Create a new ul element to hold the list of locations
const locationList = document.createElement("ul");

// Loop through the rows and create an li element for each one
rows.forEach(function(row) {
  const li = document.createElement("li");
  li.textContent = row.Titel;
  locationList.appendChild(li);

  // Add a click event to each li element to center the map on the location
  li.addEventListener("click", function() {
    mymap.setView([row.LAT, row.LON], 16);
  });

  L.marker([row.LAT, row.LON]).addTo(mymap)
    .bindPopup("<b>" + row.Titel + "</b><br />" + row.Description + "<br/><img src='" + row.ImageURL + "' width='200' />");
});

// Append the ul element to a div in your HTML file
document.getElementById("location-list-container").appendChild(locationList);