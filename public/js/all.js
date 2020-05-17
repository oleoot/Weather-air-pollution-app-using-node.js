const mymap = L.map('checkinMap').setView([0, 0], 1);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl =
    'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);




const wrapper = document.querySelector('#wrapper')
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);
    data.forEach(item => {
        const { lat, lon, weather, air } = item;
        const marker = L.marker([lat, lon]).addTo(mymap);
        if (air.value < 0) {
            const txt = `<p>The weather here at ${lat}, ${lon} is ${weather.summary} with a temperature of ${weather.temperature}degrees C.</p>
    <p>Air quality info is not avaliable`
            marker.bindPopup(txt);
        } else {
            const txt = `<p>The weather here at ${lat}, ${lon} is ${weather.summary} with a temperature of ${weather.temperature}degrees C.</p>
        <p>Air quality here is: ${air.value} ${air.unit}`
            marker.bindPopup(txt);
        }
    });
}
getData();
