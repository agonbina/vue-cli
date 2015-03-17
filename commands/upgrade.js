var Command = require('ronin').Command,
    colors = require('colors'),
    fs = require('fs-extra'),
    ask = require('asking').ask,
    config = require('rc')('vue'),
    pluck = require('101/pluck'),
    request = require('unirest'),
    keys = Object.keys


var gulp = require('gulp'),
    git = require('gulp-git'),
    shell = require('gulp-shell')

var Release = Command.extend({

    desc: 'Upgrade a dependency to its latest version(tag) published on your git host',

    run: function (dependency) {
        var pkg = fs.readJsonSync('./package.json', { throws: false })

        if(!pkg) throw new Error('there is no package.json in the current directory')

        var dependencies = []
        var token = pluck(config, 'git.api.token')

        if(!token) throw new Error('You must set an API token to ...')

        /**
         * Find the definitions for each dependency(or just the dependency passed in through the CLI)
         */

        pkg.dependencies = pkg.dependencies || {}

        if(dependency) {
            var definition = pkg.dependencies[dependency]

            if(!definition) throw new Error(dependency + ' is not installed in your package.json')

            dependencies.push(resolveDependency(definition, dependency))
        } else {
            keys(pkg.dependencies).forEach(function (dependency) {
                var definition = pkg.dependencies[dependency]
                dependencies.push(resolveDependency(definition, dependency))
            })
        }

        gulp.task('npm-install', shell.task('npm install'))

        dependencies.forEach(function (dependency) {
            checkRemote(dependency, function (err, response) {
                if(!err) {
                    var latestV = response[0].name
                    var definition = pkg.dependencies[dependency.name]

                    pkg.dependencies[dependency.name] = definition.split('#')[0] + '#' + latestV
                    fs.writeJSON('./package.json', pkg, function (err) {
                        if(err) {
                            throw new Error(err.message)
                        }

                        gulp.start('npm-install')
                    })
                } else {
                    console.log(err.message)
                }
            })
        })
    }
});

// Helpers

function resolveDependency(definition, name) {
    var tokens = definition.split('#')

    return {
        name: name,
        url: tokens[0],
        version: tokens[1] || ''
    }
}

function checkRemote(dependency, cb) {
    var url = pluck(config, 'git.api.url') || 'https://gitlab.com'
    var org = pluck(config, 'git.organization')
    var token = pluck(config, 'git.api.token')

    request.get(url + '/api/v3/projects/' + org + '%2F' + dependency.name + '/repository/tags')
        .header('PRIVATE-TOKEN', token)
        .end(function (response) {
            var isOk = response.status === 200

            if(isOk) {
                cb(null, response.body)
            } else {
                cb(response.error)
            }
        })
}

module.exports = Release