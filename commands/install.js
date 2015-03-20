
/**
 * Command dependencies
 */

var Command = require('ronin').Command,
    fs = require('fs-extra'),
    union = require('lodash.union'),
    async = require('async'),
    _ = require('../lib/utils'),
    shell = require('../lib/shell'),
    gutil = require('gulp-util'),
    colors = _.colors


/**
 * vue install -- installs all vue dependencies by running 'npm install dependency'
 */

var Install = Command.extend({
    desc: 'Install a Vue.js component, mixin, etc',

    run: function () {
        var pkg = _.readPkgJson()

        // read package.json "vue" and move dependencies to package.json
        var pkgVue = pkg['vue'] || {}
        var components = pkgVue['components'] || []
        var mixins = pkgVue['mixins'] || []
        var dependencies = union(components, mixins).map(_.parseDependency)

        async.eachSeries(dependencies, shell.installDependency, function (err) {
            if (err) {
                gutil.log(colors.warn(err.message))
            } else {
                gutil.log(colors.success('Dependencies installed successfully.'))
            }
        })

    }
})

module.exports = Install