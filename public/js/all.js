const wrapper = document.querySelector('#wrapper')
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);
    data.forEach(item => {
        const { lat, lon, mood, timestamp } = item
        const div = document.createElement('div');
        const latitude = document.createElement('p');
        latitude.innerText = `Широта: ${lat}°`
        const longitude = document.createElement('p')
        longitude.innerText = `Долгота: ${lon}°`
        div.append(latitude, longitude)
        wrapper.append(div);
    });
}
getData();
