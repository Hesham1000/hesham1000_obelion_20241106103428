const express = require('express');
const { Availability } = require('../models'); // Adjusted import to match the table created

const getAvailability = async (req, res) => {
    try {
        const availability = await Availability.findAll();
        res.status(200).json(availability);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve availability data' });
    }
};

const updateAvailability = async (req, res) => {
    const { monday, tuesday } = req.body; // Add other days as needed
    try {
        const availability = await Availability.findByPk(req.params.id);
        if (availability) {
            await availability.update({ monday, tuesday }); // Update other days as needed
            res.status(200).json(availability);
        } else {
            res.status(404).json({ error: 'Availability record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update availability data' });
    }
};

const createAvailability = async (req, res) => {
    const { monday, tuesday } = req.body; // Add other days as needed
    try {
        const newAvailability = await Availability.create({ monday, tuesday }); // Add other days as needed
        res.status(201).json(newAvailability);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create availability data' });
    }
};

const deleteAvailability = async (req, res) => {
    try {
        const availability = await Availability.findByPk(req.params.id);
        if (availability) {
            await availability.destroy();
            res.status(200).json({ message: 'Availability record deleted' });
        } else {
            res.status(404).json({ error: 'Availability record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete availability data' });
    }
};

module.exports = {
    getAvailability,
    updateAvailability,
    createAvailability,
    deleteAvailability
};