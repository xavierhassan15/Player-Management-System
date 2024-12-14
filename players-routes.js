const express = require('express');
const PlayerModel = require('../models/schema');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newPlayer = new PlayerModel(req.body);
        await newPlayer.save();
        res.status(201).send({ message: 'Player added successfully', player: newPlayer });
    } catch (error) {
        res.status(400).send({ message: 'Failed to add player', error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const allPlayers = await PlayerModel.find({});
        res.status(200).send({ players: allPlayers });
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch players', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const singlePlayer = await PlayerModel.findOne({ playerId: req.params.id });
        if (!singlePlayer) return res.status(404).send({ message: 'Player not found' });
        res.status(200).send(singlePlayer);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch player', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedPlayer = await PlayerModel.findOneAndUpdate(
            { playerId: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPlayer) return res.status(404).send({ message: 'Player not found' });
        res.status(200).send({ message: 'Player updated successfully', player: updatedPlayer });
    } catch (error) {
        res.status(400).send({ message: 'Failed to update player', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedPlayer = await PlayerModel.findOneAndDelete({ playerId: req.params.id });
        if (!deletedPlayer) return res.status(404).send({ message: 'Player not found' });
        res.status(200).send({ message: 'Player deleted successfully', player: deletedPlayer });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete player', error: error.message });
    }
});

module.exports = router;