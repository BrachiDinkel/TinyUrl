// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// קשר עם מסד הנתונים
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// middleware
app.use(bodyParser.json());

// routes
const redirectRouter = require('./routes/redirect');
app.use('/api/redirect', redirectRouter);

// האזנה לפורט
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
