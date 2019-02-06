const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/getResponse', (req, res) => {
  res.send({reponse: 'response'});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port);
console.log('Server hosted on port ' + port);
