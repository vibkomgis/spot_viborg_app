
let stederData = 'data/sevaerdighederData/da-short.json';
let kirkeData = 'data/ruteData/da-kirke-rute.json';
let fetchFacilities = 'data/facilities/facilities-da.json'
let info = "Hør mere her"
function setFetchData(aa) {
    

    if (aa === 'en') {
        stederData = 'data/sevaerdighederData/en-short.json';
        kirkeData = 'data/ruteData/en-kirke-rute.json';
        fetchFacilities = 'data/facilities/facilities-en.json'
        info = "Learn more"
    }
    else if (aa === 'de') {
        stederData = 'data/sevaerdighederData/de-short.json';
        kirkeData = 'data/ruteData/de-kirke-rute.json';
        fetchFacilities = 'data/facilities/facilities-de.json'
        info = "Erfahren Sie mehr"
    }
    else {
        stederData = 'data/sevaerdighederData/da-short.json';
        kirkeData = 'data/ruteData/da-kirke-rute.json';
        fetchFacilities = 'data/facilities/facilities-da.json'
        info = "Hør mere her"
    }

    const event = new Event('fetchDataUpdated');
    window.dispatchEvent(event);

    return stederData;
    return kirkeData;
    return fetchFacilities;
    return info;
}
