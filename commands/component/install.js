/**
 * Command dependencies
 */

var Command = require('ronin').Command,
    _ = require('../../lib/utils'),
    shell = require('../../lib/shell'),
    pluck = require('101/pluck'),
    isEmpty = require('101/is-empty')


/**
 * vue component install
 */

var Install = Command.extend({
    desc: 'Install a component',

    run: function (name) {
        var pkg = _.readPkgJson(),
            components = pluck(pkg, 'vue.components')

        if (!name) throw new Error('vue component install [componentName]')

        // Save it in package.json under [vue.components]
        if (isEmpty(components)) {
            set(pkg, 'vue.components', [])
        }

        var dependency = _.parseDependency(name)
        components.push(name)

        shell.installDependency(dependency, function (err) {
            if (err) {
                console.log(err.message)
            } else {
                console.log('Installed successfully')
                _.updatePkgJson(pkg, function () { })
            }
        })
    }
});

module.exports = Install;
