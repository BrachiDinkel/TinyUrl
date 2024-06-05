// models/link.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClickSchema = new Schema({
    insertedAt: {
        type: Date,
        default: Date.now
    },
    ipAddress: String,
    targetParamValue: String
});

const LinkSchema = new Schema({
    originalUrl: String,
    clicks: [ClickSchema],
    targetParamName: {
        type: String,
        default: "target"
    },
    targetValues: [{
        name: String,
        value: String
    }]
});

module.exports = mongoose.model('Link', LinkSchema);


