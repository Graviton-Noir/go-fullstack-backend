const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


const stuffRoutes = require('./routes/stuff')
const userRoutes = require("./routes/user")

mongoose.connect("mongodb+srv://gravitonNoir:Jd132BKOK9qli34I@cluster0.97gds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)

module.exports = app;