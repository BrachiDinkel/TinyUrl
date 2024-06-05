// routes/redirect.js

const express = require('express');
const router = express.Router();
const Link = require('../models/link');

router.get('/:identifier', async (req, res) => {
    try {
        const link = await Link.findOne({ identifier: req.params.identifier });

        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }

        const click = {
            ipAddress: req.ip
        };

        const targetParamValue = req.query[link.targetParamName];
        if (targetParamValue) {
            click.targetParamValue = targetParamValue;
        }

        link.clicks.push(click);
        await link.save();

        return res.redirect(link.originalUrl);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:identifier/clicks', async (req, res) => {
    try {
        const link = await Link.findOne({ identifier: req.params.identifier });

        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }

        const clicksBySource = {};
        link.clicks.forEach(click => {
            if (!clicksBySource[click.targetParamValue]) {
                clicksBySource[click.targetParamValue] = 1;
            } else {
                clicksBySource[click.targetParamValue]++;
            }
        });

        return res.json({ clicksBySource });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
