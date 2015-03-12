
var path = require('path')
var git = require('gulp-git')

module.exports = function gitInit (next) {
  var name = this.options['_'][0]

  if(!name) next()

  git.init({ cwd: path.join('./', name) }, function (err) {
    if(err) throw new Error(err.message)
    next()
  })
}