let lat, lon;
if (navigator.geolocation) {
    console.log('Geolocation is supported by this browser.')
    navigator.geolocation.getCurrentPosition(async position => {
        const wrapper = document.querySelector('.home-wrapper');
        console.log(wrapper)
        const latitude = document.querySelector('#latitude');
        const longitude = document.querySelector('#longitude');
        const summary = document.querySelector('#summary');
        const temperature = document.querySelector('#temperature');
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        latitude.textContent = `${lat.toFixed(2)}°`;
        longitude.textContent = `${lon.toFixed(2)}°`;
        const api_url = `weather/${lat},${lon}`;
        const response = await fetch(api_url);
        const json = await response.json();
        const { air_quality, weather } = json;
        summary.append(weather.currently.summary)
        temperature.append(weather.currently.temperature);
        console.log(air_quality.results)
        air_quality.results.forEach(result => {
            const air = document.createElement('p');
            air.append(`${result.city} ${result.measurements[0].value.toFixed(2)} ${result.measurements[0].unit}`)
            console.log(air)
            wrapper.append(air)
        });

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
