const express = require('express');
const cache = require('node-cache');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello,World!');

});

app.listen(port, () => {
	console.log(`Start server listening at http://localhost:${port}`)
});
