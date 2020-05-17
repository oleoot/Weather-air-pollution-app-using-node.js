const mymap = L.map('checkinMap').setView([0, 0], 2);
const tileUrl =
    'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl);
const southWest = L.latLng(-89.98155760646617, -180)
const northEast = L.latLng(89.99346179538875, 180);
const bounds = L.latLngBounds(southWest, northEast);
mymap.setMaxBounds(bounds);
mymap.on('drag', function () {
    mymap.panInsideBounds(bounds, { animate: false });
});
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
