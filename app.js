var express = require('express');
var app = express();

app.use(express.static(__dirname + '/src'));

app.listen(process.env.PORT || 5532);

console.log('-------------------------------------------------------------------');
console.log('Application available at http://localhost:' + (process.env.PORT || 5532))
console.log('-------------------------------------------------------------------');