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
        const div = document.createElement('div');
        const latitude = document.createElement('p');
        latitude.innerText = `Широта: ${lat}°`
        const longitude = document.createElement('p')
        longitude.innerText = `Долгота: ${lon}°`
        const weatherp = document.createElement('p');
        console.log(weather)
        weatherp.innerText = `Weather: ${weather.summary} | ${weather.temperature}C`;
        const airp = document.createElement('p');
        airp.innerText = `Air: ${air.value} ${air.unit}`
        div.append(latitude, longitude, weatherp, airp)
        wrapper.append(div);
    });
}
getData();
