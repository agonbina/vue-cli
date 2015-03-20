var Command = require('ronin').Command;

var Build = Command.extend({
  desc: 'Build your app dependencies using a webpack configuration',
  
  run: function () {
    console.log('Build command');
  }
});

module.exports = Build;
