
var path = require('path'),
    fs = require('fs')

module.exports = function checkDir (next) {
  var name = this.options['_'][0]

  // Skip if a name was not specified
  if(!name) next()

  // Attempt to create a directory for this component/mixin
  var dirPath = path.join('./', name)

  if(fs.existsSync(dirPath)) {
    throw new Error('A directory with the name of ' + name + ' already exists in this directory.')
  } else {
    fs.mkdirSync(dirPath)
    next()
  }
};