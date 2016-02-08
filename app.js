var express = require('express');
var app = express();

var go_to_root = function(req, res){
	res.redirect(302, '/');
};

app.get('/mp', go_to_root);
app.get('/hi', go_to_root);
app.get('/hi/mp', go_to_root);
app.get('/fb-trai', go_to_root);

app.use(express.static(__dirname + '/src'));

app.listen(process.env.PORT || 5532);

console.log('-------------------------------------------------------------------');
console.log('Application available at http://localhost:' + (process.env.PORT || 5532))
console.log('-------------------------------------------------------------------');
