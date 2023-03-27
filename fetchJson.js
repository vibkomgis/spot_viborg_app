
let fetchData = 'data/sevaerdighederData/da-short.json';

function setFetchData(aa) {
    

    if (aa === 'en') {
        fetchData = 'data/sevaerdighederData/en-short.json';
    }
    else if (aa === 'de') {
        fetchData = 'data/sevaerdighederData/de-short.json';
    }
    else {
        fetchData = 'data/sevaerdighederData/da-short.json';
    }

    const event = new Event('fetchDataUpdated');
    window.dispatchEvent(event);

    return fetchData;
}
