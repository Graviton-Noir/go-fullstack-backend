const Thing = require("../models/Thing")

exports.createThing = (req, res, next) =>
{
    const thingObject = JSON.parse(req.body.thing)

    // Mesure de sécurité : empêche de réutiliser les memes id sur un autre object
    delete thingObject._id
    delete thingObject._userId

    const thing = new Thing({
        ...thingObject,
        userId : req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    thing.save()
    .then(() => {
        res.status(201).json({ message : "Object created !"})
    })
    .catch(error => {
        res.status(400).json({ error: error })
    })
}

exports.updateThing = (req, res, next) =>
{
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    }

    // Mesure de sécurité : empêche de réutiliser les memes id sur un autre object
    delete thingObject._userId

    Thing.findOne({ _id: req.params.id })
    .then(thing => {
        if (thing.userId != req.auth.userId) {
            res.status(401).json({ message : "Unauthorized tamer"})
        }
        else {
            Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
            .then(() => res.status(200).json({ message : "Object updated "}))
            .catch(error => res.status(400).json({ error : error }));
        }
    })
    .catch(error => res.status(404).json({ error: error }))
}

exports.deleteThing = (req, res, next) =>
{
    Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Object deleted" }))
    .catch(error => res.status(400).json({error: error}));
}

exports.getAllThings = (req, res, next) =>
{
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error: error }));
}

exports.getOneThing = (req, res, next) =>
{
    Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error: error }))
}