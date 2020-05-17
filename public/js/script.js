let lat, lon;
if (navigator.geolocation) {
    console.log('Geolocation is supported by this browser.')
    navigator.geolocation.getCurrentPosition(async position => {
        let lat, lon, weather, air;
        try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.querySelector('#latitude').textContent = lat.toFixed(2);
            document.querySelector('#longitude').textContent = lon.toFixed(2)
            const api_url = `weather/${lat},${lon}`;
            const response = await fetch(api_url);
            const json = await response.json();
            weather = json.weather.currently;
            air = json.air_quality.results[0].measurements[0];
            document.querySelector('#summary').textContent = weather.summary;
            document.querySelector('#temperature').textContent = weather.temperature;
            document.querySelector('#aq_value').textContent = air.value + air.unit;
        }
        catch (error) {
            console.log(error);
            air = { value: -1, unit: '' };
            document.querySelector('#aq_value').textContent = "No reading for current city, pick different one";
        }
        // BTN Presses ===========================================================================
        const btn = document.querySelector('#submit')
        btn.addEventListener('click', async event => {

            const data = { lat, lon, weather, air };
            console.log(data)
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }
            const db_response = await fetch('/api', options);
            const db_json = await db_response.json();
        });
    });
} else {
    console.log = "Geolocation is not supported by this browser.";
}
