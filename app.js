const express = require('express');
const mongoose = require('mongoose');

const Thing = require("./models/Thing");

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

app.put("/api/stuff/:id", (req, res, next) => 
{
	Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
	.then(() => res.status(200).json({ message : "Object updated "}))
	.catch(error => res.status(400).json({ error : error }));
})

app.delete("/api/stuff/:id", (req, res, next) =>
{
	Thing.deleteOne({ _id: req.params.id })
	.then(() => res.status(200).json({ message: "Object deleted" }))
	.catch(error => res.status(400).json({error: error}));
})

app.get("/api/stuff/:id", (req, res, next) => {
	Thing.findOne({ _id: req.params.id })
	.then(thing => res.status(200).json(thing))
	.catch(error => res.status(404).json({ error: error }));
});

app.get('/api/stuff', (req, res, next) => {
	Thing.find()
	.then(things => res.status(200).json(things))
	.catch(error => res.status(400).json({ error: error }));
});

app.post("/api/stuff", (req, res, next) =>
{
	delete req.body._id
	
	const thing = new Thing({
		...req.body
	})

	thing.save()
	.then(() => res.status(201).json({ message : "Object created !"}))
	.catch(error => res.status(400).json({ error: error }))
})

module.exports = app;