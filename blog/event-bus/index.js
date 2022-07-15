const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  try {
    const event = req.body;

    events.push(event);

    axios.post('http://127.0.0.1:4000/events', event).catch((err) => {
      console.log(err.message);
    });
    axios.post('http://127.0.0.1:4001/events', event).catch((err) => {
      console.log(err.message);
    });
    axios.post('http://127.0.0.1:4002/events', event).catch((err) => {
      console.log(err.message);
    });
    axios.post('http://127.0.0.1:4003/events', event).catch((err) => {
      console.log(err.message);
    });

    res.send({ status: 'OK' });
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/events', (req, res) => {
  try {
    res.send(events);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(4005, () => {
  console.log('Event-Bus. Listening on port 4005');
});
