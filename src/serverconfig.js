module.exports = {
	getHostData : function(hostData) {
		var data = {};
		//var file = 'host.json';
		var fs = require("fs");

		var data = JSON.parse(fs.readFileSync(hostData, 'utf8', function(err) {
			if (err) {
				console.log('ERROR: ' + err);
				return;
			}
		}));

		var config = {
			host : data.config.host,
			port : data.config.port,
			userName : data.config.user,
			password: "",
			passPhrase : "",
			privateKey  : fs.readFileSync(data.config.key),
			path : data.config.path  
		};
		return config;
	}
};
