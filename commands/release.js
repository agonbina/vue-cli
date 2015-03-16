var Command = require('ronin').Command,
    colors = require('colors'),
    fs = require('fs-extra'),
    semver = require('semver'),
    ask = require('asking').ask


var gulp = require('gulp'),
    git = require('gulp-git'),
    shell = require('gulp-shell')

var Release = Command.extend({

    desc: 'Release a new version of this component',

    run: function (type) {
        var pkg = fs.readJsonSync('./package.json', { throws: false })

        type = type || 'patch'

        if(!pkg) throw new Error('there is no package.json in the current directory')

        var current = pkg.version || '0.0.0'
        var next = semver.inc(current, type)

        if(!semver.valid(next)) {
            throw new Error('Trying to release an invalid version: ' + next)
        }

        pkg.version = next

        gulp.task('git-release', shell.task('git release ' + next))


        ask('Releasing version ' + next +'. Continue? (Y/n)', { default: 'Y' }, function (err, answer) {
            if(err) throw new Error(err.message)

            if(answer.toLowerCase() === 'y') {
                fs.writeJSON('./package.json', pkg, function (err) {
                    if(err) {
                        throw new Error(err.message)
                    }

                    gulp.start('git-release')
                })
            }
        })

    }
});

module.exports = Release