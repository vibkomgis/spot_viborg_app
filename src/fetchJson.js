
let stederData = 'data/sevaerdighederData/da-short.json';
let kirkeData = 'data/ruteData/da-kirke-rute.json';
let hemmeligeData = 'data/ruteData/da-hemmelige-rute.json';
let monumenterData = 'data/ruteData/da-monumenter-rute.json';
let fetchFacilities = 'data/facilities/facilities-da.json'
let info = "Hør mere her"
function setFetchData(aa) {
    

    if (aa === 'en') {
        stederData = 'data/sevaerdighederData/en-short.json';
        kirkeData = 'data/ruteData/en-kirke-rute.json';
        hemmeligeData = 'data/ruteData/en-hemmelige-rute.json';
        monumenterData = 'data/ruteData/en-monumenter-rute.json';
        fetchFacilities = 'data/facilities/facilities-en.json'
        info = "Learn more"
        document.documentElement.lang = 'en';

    }
    else if (aa === 'de') {
        stederData = 'data/sevaerdighederData/de-short.json';
        kirkeData = 'data/ruteData/de-kirke-rute.json';
        hemmeligeData = 'data/ruteData/de-hemmelige-rute.json';
        monumenterData = 'data/ruteData/de-monumenter-rute.json';
        fetchFacilities = 'data/facilities/facilities-de.json'
        info = "Erfahren Sie mehr"
        document.documentElement.lang = 'de';
        
    }
    else {
        stederData = 'data/sevaerdighederData/da-short.json';
        kirkeData = 'data/ruteData/da-kirke-rute.json';
        hemmeligeData = 'data/ruteData/da-hemmelige-rute.json';
        monumenterData = 'data/ruteData/da-monumenter-rute.json';
        fetchFacilities = 'data/facilities/facilities-da.json'
        info = "Hør mere her"
        document.documentElement.lang = 'da';

    }

    const event = new Event('fetchDataUpdated');
    window.dispatchEvent(event);

    return stederData;
    return kirkeData;
    return monumenterData
    return hemmeligeData
    return fetchFacilities;
    return info;
}
