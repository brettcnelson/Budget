const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const defaultCollection = require('./models/default');

const mongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost/default';
mongoose.connect(mongoURI);
const db = mongoose.connection;

const app = express();
const port = process.env.PORT || 4040;

process.env.NODE_ENV === 'production' && app.use(express.static('client/build'));

app.use(bodyParser.json());

app.get('/api', (req, res) => {
	res.json({"check":"EXPRESS /api PROXY SERVER CONNECTED"});
});

app.post('/api/entries', (req, res) => {
	var entry = req.body;
	defaultCollection.create(entry, (err, entry) => {
		if (err) {
			throw err;
		}
		res.json(entry);
	});
});

app.get('/api/entries', (req, res) => {
	defaultCollection.find((err, entries) => {
		if (err) {
			throw err;
		}
		res.json(entries);
	});
});

app.put('/api/entries/:_id', (req, res) => {
	defaultCollection.findByIdAndUpdate(req.params._id, req.body, {new:true}, (err, entry) => {
		if (err) {
			throw err;
		}
		res.json(entry);
	});
});

app.delete('/api/entries/:_id', (req, res) => {
	defaultCollection.findByIdAndRemove(req.params._id, (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});


app.listen(port, () => console.log(`express listening on port ${port}`));
