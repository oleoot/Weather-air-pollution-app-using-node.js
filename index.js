const express = require('express');
const Datastore = require('nedb');
const app = express();
const fetch = require('node-fetch')
app.listen(3000, () => console.log('Listening at 3000'))
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data)
    response.json(data);
})

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return
        }
        response.json(data);
    })

})



app.get('/weather/:latlon', async (request, response) => {
    console.log(request.params)
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
    const api_url = `https://api.darksky.net/forecast/e3189ed0d8f7fb82a8db79b1678dff60/${lat},${lon}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
});
