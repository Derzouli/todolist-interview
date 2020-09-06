"use strict";

const express = require('express');
const nodecache = require('node-cache');
const app = express();
const bodyParser = require('body-parser'); 
const port = process.env.PORT || 3000;
const path = require('path');
const methodOverride = require('method-override');

// override with POST having ?_method=PUT
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./service/api.js'));

const server = app.listen(port, () => {
	console.log(`Start server listening at http://localhost:${port}`)
});

module.exports = { server }
