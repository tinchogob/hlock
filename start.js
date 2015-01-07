var app = require('./app.js');

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log('running on port %s', port);
});