var settings = require('./serverconfig.js');

//Host object 
var host = {
  server: settings.getHostData('host.json'),
  hosts:               [], //optional default:[] 
  msg: {
    send: function( message ) {
      console.log(message);
    }
  }, 
  verbose:             true,  //optional default:false 
  debug:               false,  //optional default:false 
  idleTimeOut:         5000,        //optional: value in milliseconds (default:5000) 
};

module.exports = {
  backup : function() {
    host.connectedMessage =  "--- Connected: backup data";
    host.readyMessage = " ";
    host.closedMessage =  "--- backup done";
    host.commands = [
                      "cd " + host.server.path,
                      "rm " + host.server.file + " --force",
                      "tar -czvf " + host.server.file + " " + host.server.appfolder,
                      "rm -rf " + host.server.appfolder,
                      "mkdir " + host.server.appfolder
                    ];
    return host;
  },
  release : function() {
    host.connectedMessage =  "--- importing new data";
    host.readyMessage = " ";
    host.closedMessage =  "--- release done";
    host.commands = []; // clear array
    host.commands = [
                      "cd " + host.server.path,
                      "tar -xvf " + host.server.file + " --strip 1",
                      "rm " + host.server.file
                    ];
    return host;
  }
};


