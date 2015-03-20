var Command = require('ronin').Command;

var Dev = Command.extend({
  desc: 'Replace your remote dependencies with their local paths and run webpack --watch',
  
  run: function () {
    console.log('Dev command');
  }
});

module.exports = Dev;
