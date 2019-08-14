const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '/dist/metronic')));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/metronic/index.html'));
});
app.listen(process.env.PORT);