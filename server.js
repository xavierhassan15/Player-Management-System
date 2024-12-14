const express = require('express');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/players-routes');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/players', playerRoutes);
app.use('/players', playerRoutes);

mongoose.connect('mongodb://localhost:27017/playerManagement')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});