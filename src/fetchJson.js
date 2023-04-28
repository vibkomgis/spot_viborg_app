
let fetchData = 'data/sevaerdighederData/da-short.json';
let fetchFacilities = 'data/facilities/facilities-da.json'
let info = "Hør mere her"
function setFetchData(aa) {
    

    if (aa === 'en') {
        fetchData = 'data/sevaerdighederData/en-short.json';
        fetchFacilities = 'data/facilities/facilities-en.json'
        info = "Learn more"
    }
    else if (aa === 'de') {
        fetchData = 'data/sevaerdighederData/de-short.json';
        fetchFacilities = 'data/facilities/facilities-de.json'
        info = "Erfahren Sie mehr"
    }
    else {
        fetchData = 'data/sevaerdighederData/da-short.json';
        fetchFacilities = 'data/facilities/facilities-da.json'
        info = "Hør mere her"
    }

    const event = new Event('fetchDataUpdated');
    window.dispatchEvent(event);

    return fetchData;
    return fetchFacilities
    return info
}
