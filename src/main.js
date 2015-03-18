var init = require('./sshexec.js');
var sftp = require('./fileupload.js');
var exec = require('child_process').exec;


//Create a new instance 
var SSH2Shell = require ('ssh2shell'),
    SSHfirst       = new SSH2Shell(init.backup());
    

var second = function() {
	var SSHsecond  = new SSH2Shell(init.release());
	SSHsecond.connect();
};

//Start the process 
SSHfirst.connect();
SSHfirst.on('close', function() {  // uplad release after first ssh session
	exec(sftp.scp, function() {
		console.log('--- uploading done ---');
		second(); // execute after upload is done
	});
});

	

