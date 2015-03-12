var Command = require('ronin').Command,
    colors = require('colors'),
    last = require('101/last')


var path = require('path'),
    gulp = require('gulp'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    print = require('gulp-print')


// Helpers

function resolveTemplate(tpl) {
    return path.join(__dirname, '../../templates', tpl)
}

var Create = Command.extend({

    desc: 'Create a new component',

    use: ['check-dir', 'git-init'],

    options: {
        extend: {
            type: 'string',
            alias: 'e'
        }
    },

    run: function (extendComponentName, name) {
        var data = {
                name: name,
                description: 'A description for this component'
            },
            templates = []

        if (!name) throw new Error('A component name must be specified. \n\tvue component create NAME')

        if(extendComponentName !== undefined) {
            data.extendComponentName = extendComponentName

            templates.push(resolveTemplate('/component/extend/**'))
            templates.push(resolveTemplate('/component/*'))
            templates.push('!' + resolveTemplate('/component/create'))
        } else {
            templates.push(resolveTemplate('/component/create/**'))
            templates.push(resolveTemplate('/component/*'))
            templates.push('!' + resolveTemplate('/component/extend'))
        }

        /**
         * Task to copy, interpolate and move the templates to the new directory for this component
         */

        gulp.task('templates', function () {
            return gulp.src(templates, {dot: true})
                .pipe(template(data, {
                    interpolate: /{{([\s\S]+?)}}/g
                }))
                .pipe(rename(function (path) {
                    if (path.basename === 'module') path.basename = name
                }))
                .pipe(gulp.dest(name))
                .pipe(print(function (path) {
                    console.log('created '.green + last(path.split('/')))
                }))
        })

        gulp.task('all', ['templates'])
        gulp.start('all')
    }
});

module.exports = Create