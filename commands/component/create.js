var Command = require('ronin').Command,
    colors = require('colors'),
    last = require('101/last')


var path = require('path'),
    gulp = require('gulp'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    print = require('gulp-print')


var Create = Command.extend({

    desc: 'Create a new component',

    use: ['check-dir', 'git-init'],

    run: function (name) {
        var data = {
            name: name,
            description: 'A description for this component'
        }

        if (!name) throw new Error('A component name must be specified. \n\tvue component create NAME')

        /**
         * Task to copy, interpolate and move the templates to the new directory for this component
         */

        gulp.task('templates', function () {
            var templates = [
                path.join(__dirname, '../../templates/component/create/**'),
                path.join(__dirname, '../../templates/component/*'),
                '!' + path.join(__dirname, '../../templates/component/extend')
            ]

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
