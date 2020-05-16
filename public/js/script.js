let lat, lon;
if (navigator.geolocation) {
    console.log('Geolocation is supported by this browser.')
    navigator.geolocation.getCurrentPosition(async position => {
        const latitude = document.querySelector('#latitude');
        const longitude = document.querySelector('#longitude');
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        latitude.textContent = `${lat}°`;
        longitude.textContent = `${lon}°`;
        const api_url = `weather/${lat},${lon}`;
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json)
    });
} else {
    console.log = "Geolocation is not supported by this browser.";
}
// BTN Presses ===========================================================================
const btn = document.querySelector('#submit')
btn.addEventListener('click', async event => {
    const data = { lat, lon };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
    const response = await fetch('/api', options);
    const json = await response.json();
});
