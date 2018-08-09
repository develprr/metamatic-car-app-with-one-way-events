const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.use('/app', express.static('public'))
app.use('/app', express.static(path.join(__dirname, 'public')))

const getCars = () => [
  {
    'id': 1,
    'model': 'Audi',
    'speed': 170,
    'color': 'black',
    'price': 28500,
    'marketShare': []
  },
  {
    'id': 2,
    'model': 'Porsche',
    'speed': 250,
    'color': 'white',
    'price': 61000,
    'marketShare': []
  },
  {
    'id': 3,
    'model': 'Tesla',
    'speed': 280,
    'color': 'green',
    'price': 79000,
    'marketShare': []
  },
  {
    'id': 4,
    'model': 'Ferrari',
    'speed': 320,
    'color': 'red',
    'price': 344000,
    'marketShare': []
  },
  {
    'id': 5,
    'model': 'Lamborghini',
    'speed': 334,
    'color': 'yellow',
    'price': 521000,
    'marketShare': []
  },
  {
    'id': 6,
    'model': 'Bugatti',
    'speed': 420,
    'color': 'blue',
    'price': 1591000,
    'marketShare': []
  }
];

const getCarsMap = () => getCars().reduce((map, car) => {
  map[car.id] = car;
  return map;
}, {});

const getCarById = (id) => getCarsMap()[id];

app.get('/api/cars', function (req, res) {
  const id = req.params.id;
  res.json(getCars());
});

app.get('/api/cars/:id', (req, res) => {
  const id = req.params.id;
  res.json(getCarById(id));
});

module.exports = app;
app.listen(3001);