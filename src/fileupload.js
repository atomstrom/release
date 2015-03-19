/**
* login settings
*/
var data = {};
var file = 'host.json';
var fs = require("fs");

var data = JSON.parse(fs.readFileSync(file, 'utf8', function(err) {
	if (err) {
		console.log('ERROR: ' + err);
		return;
	}
}));

var config = {
	name : data.config.user,
	host : data.config.host,
	port : data.config.port,
	key  : data.config.keypath,
	file : '../' + data.config.file,
	path : data.config.path,
};


/**
* create the scp command
*/
var scp = [
	'scp',
	config.file,
	config.name + '@' + config.host + ':' + config.path 
];

if (config.key) {
	scp.splice(1, 0, '-i');
	scp.splice(2, 0, config.key);
}

scp = scp.join(' ');

module.exports = {
	scp: scp
};



