const house = require('../models/houseModel');

module.exports = {
    addHouse: (req, res) => {
        console.log(req.body)
        house.addHouse(req.body, (error, results) => {
            error ? res.status(500).send(error) : res.status(200).json(results);
        })
    },
    getOneHouse: (req, res) => {
        house.getOneHouse(req.params.id, (error, results) => {
            error ? res.status(500).send(error) : res.status(200).json(results);
        })
    },
    getOwnerHouses: (req, res) => {
        house.getOwnerHouses(req.params.id, (error, results) => {
            error ? res.status(500).send(error) : res.status(200).json(results);
        })
    },
    deleteHouse: (req, res) => {
        house.deleteHouse(req.params.id, (error, results) => {
            error ? res.status(500).send(error) : res.status(201).json('deleted');
        })
    },
    getAllHouses: (req, res) => {
        house.getAllHouses((error, results) => {
            error ? res.status(500).send(error) : res.status(200).json(results);
        })
    },
    updateHouse: (req, res) => {
        house.updateHouse(req.body, req.params.id, (error, results) => {
            error ? res.status(500).send(error) : res.status(201).json(results);
        })
    },


}