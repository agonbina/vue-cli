
var path = require('path')
var git = require('gulp-git')
var gutil = require('gulp-util')
var config = require('rc')('vue').git

module.exports = function gitInit (next) {
  var name = this.options['_'][0]
  var repo = ''

  if(!config) next()

  repo += config.host === 'gitlab'
            ? 'git@gitlab.com'
                : config.host === 'bitbucket'
                  ? 'git@bitbucket.org'
                  : 'git@github.com'

  repo += ':' + config.organization + '/' + name + '.git'

  git.addRemote('origin', repo, { cwd: path.join(process.cwd(), name) }, function (err) {
    if(err) throw new Error(err.message)

    gutil.log(gutil.colors.bold.green('Added a remote origin: ' + repo))
    next()
  })
}