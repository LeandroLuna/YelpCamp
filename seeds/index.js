const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6318faa454dd821aff667c56',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum excepturi tenetur vero fugit quia, provident sapiente similique adipisci iste vitae aut beatae maiores at exercitationem, ipsum eum magnam ea minima.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dajsoxfu5/image/upload/v1664207344/YelpCamp/vpz09mk3txv88ooikkrf.jpg',
          filename: 'YelpCamp/vpz09mk3txv88ooikkrf',
        },
        {
          url: 'https://res.cloudinary.com/dajsoxfu5/image/upload/v1664207345/YelpCamp/n8sekwbhxpemkimr52tk.jpg',
          filename: 'YelpCamp/n8sekwbhxpemkimr52tk',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => mongoose.connection.close());
