
let fetchData = 'data/sevaerdighederData/da-short.json';
let fetchFacilities = 'data/facilities/facilities-da.json'
function setFetchData(aa) {
    

    if (aa === 'en') {
        fetchData = 'data/sevaerdighederData/en-short.json';
        fetchFacilities = 'data/facilities/facilities-en.json'
    }
    else if (aa === 'de') {
        fetchData = 'data/sevaerdighederData/de-short.json';
        fetchFacilities = 'data/facilities/facilities-de.json'
    }
    else {
        fetchData = 'data/sevaerdighederData/da-short.json';
        fetchFacilities = 'data/facilities/facilities-da.json'
    }

    const event = new Event('fetchDataUpdated');
    window.dispatchEvent(event);

    return fetchData;
    return fetchFacilities
}
