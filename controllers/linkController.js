// controllers/linkController.js
const Link = require('../models/link');

exports.getAllLinks = async (req, res) => {
    try {
        const links = await Link.find();
        res.json(links);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createLink = async (req, res) => {
    const link = new Link({
        originalUrl: req.body.originalUrl
    });

    try {
        const newLink = await link.save();
        res.status(201).json(newLink);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getLinkById = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (link == null) {
            return res.status(404).json({ message: 'Link not found' });
        }
        res.json(link);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateLink = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (link == null) {
            return res.status(404).json({ message: 'Link not found' });
        }

        if (req.body.originalUrl != null) {
            link.originalUrl = req.body.originalUrl;
        }

        const updatedLink = await link.save();
        res.json(updatedLink);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteLink = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (link == null) {
            return res.status(404).json({ message: 'Link not found' });
        }

        await link.remove();
        res.json({ message: 'Link deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
