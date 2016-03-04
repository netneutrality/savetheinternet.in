var pmx = require('pmx').init({
  http          : true, // HTTP routes logging (default: true)
  ignore_routes : [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
  errors        : true, // Exceptions loggin (default: true)
  custom_probes : true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network       : true, // Network monitoring at the application level
  ports         : true  // Shows which ports your app is listening on (default: false)
});


var express = require('express');
var compress = require('compression');

var app = express();

var go_to_root = function(req, res){
	res.redirect(302, '/');
};

app.get('/mp', go_to_root);
app.get('/hi', go_to_root);
app.get('/hi/mp', go_to_root);
app.get('/fb-trai', go_to_root);

app.use(compress());

app.use(express.static(__dirname + '/src'));

app.listen(process.env.PORT || 5532);

console.log('-------------------------------------------------------------------');
console.log('Application available at http://localhost:' + (process.env.PORT || 5532))
console.log('-------------------------------------------------------------------');
