

  
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
      
        // Retrieve the list element
        const list = document.getElementById('myList');
      
        // Loop through each row and create a list item with the title and image
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
      
          // Create a list item
          const listItem = document.createElement('li');
          listItem.style.display = 'flex';
          listItem.style.alignItems = 'center';
          listItem.style.marginBottom = '10px';
      
          // Create an image element
          const img = document.createElement('img');
          img.src = row.ImageURL;
          img.style.width = '40px';
          img.style.height = '40px';
          img.style.marginRight = '10px';
          img.style.borderRadius = '50%';
          listItem.appendChild(img);
      
          // Create a text element for the title
          const title = document.createElement('span');
          title.innerText = row.Titel;
          listItem.appendChild(title);
      
          // Add the list item to the list
          list.appendChild(listItem);
        }
      };
    }


