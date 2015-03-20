
var exec = require('child_process').exec,
    gutil = require('gulp-util'),
    _ = require('./utils'),
    colors = _.colors



exports.installDependency = function (dependency, done) {
    var name = dependency.name

    gutil.log(colors.info('Installing', name))

    exec('npm i -S ' + dependency.git, function (err, stdout, stderr) {
        if (!err) {
            gutil.log(stdout)
            gutil.log(colors.success('Installed', name))
        }

        done(err)
    })
}