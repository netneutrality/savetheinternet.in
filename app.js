var express = require('express');
var app = express();

app.use(express.static(__dirname + '/src'));

app.listen(process.env.PORT || 5532);