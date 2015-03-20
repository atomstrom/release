var init = require('./sshexec.js');
var sftp = require('./fileupload.js');
var exec = require('child_process').exec;
var prompt = require('prompt');


var initRelease = function() {
  var SSH2Shell = require ('ssh2shell'),
      SSHfirst       = new SSH2Shell(init.backup());

  var second = function() {
    var SSHsecond  = new SSH2Shell(init.release());
    SSHsecond.connect();
  };

  SSHfirst.connect();
  SSHfirst.on('close', function() {  // uplad release after first ssh session
    exec(sftp.scp, function() {
      console.log('--- uploading done');
      second(); // execute after upload is done
    });
  });
};

var schema = {
    properties: {
      question: {
        type: 'string',
        pattern: /^(?:Y\b|N\b|y\b|n\b)/,
        message: 'Answer not valid. Must be "y" or "n"', 
        description: 'Are you sure you want to deploy to server at ' + init.serverpath.cyan  +' (y/n) \n\n',
        required: true
      }
    }
  };

  prompt.message = "Question!".rainbow;

  prompt.start();
  console.log('------------------------');
  console.log('--- starting release ---');
  console.log('------------------------');

  prompt.get(schema, function (err, result) {
    if (result.question === 'y' || result.question === 'Y') {
      console.log('Here we go');
      initRelease();
      return;
    }
    if (result.question === 'n' || result.question === 'N') {
      console.log('Aborted by user');
      return;
    }
  });
  