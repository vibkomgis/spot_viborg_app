fetch('data/sevaerdighederData/da-long.json')
  .then(response => response.json())
  .then(data => {
    const longdescription = [];
    data.forEach(poi => {
      longdescrip.push(poi.LONG_DESCRIPTION);
    });
    console.log(longdescription);
  });