var Command = require('ronin').Command,
    colors = require('colors'),
    config = require('rc')('vue'),
    last = require('101/last')


var path = require('path'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    print = require('gulp-print'),
    prettify = require('gulp-jsbeautifier')


// Helpers

function resolveTemplate(tpl) {
    return path.join(__dirname, '../../templates', tpl)
}

function parseInfo(item) {
    var info = item.split('#')

    return {
        name: info[0],
        version: info[1] || ''
    }
}

var Create = Command.extend({

    desc: 'Create a new component',

    use: ['check-dir', 'git-init', 'add-remote'],

    options: {
        extend: {
            type: 'string',
            alias: 'e'
        },
        mixins: {
            type: 'string',
            alias: 'm'
        },
        components: {
            type: 'string',
            alias: 'c'
        }
    },

    run: function (extendComponent, mixins, components, name) {
        var data = {
                name: name,
                description: 'A description for this component',
                author: config.author || '',
                email: config.email || '',
                git: {
                    organization: config.git.organization || '',
                    host: config.git.host || ''
                }
            },
            templates = []

        if (!name) throw new Error('A component name must be specified. \n\tvue component create NAME')

        /**
         * Mixin dependencies
         */

        if(mixins) {
            data.mixins = mixins.split(',').map(parseInfo)
        } else {
            data.mixins = []
        }

        /**
         * Component dependencies
         */

        if(components) {
            data.components = components.split(',').map(parseInfo)
        } else {
            data.components = []
        }


        /**
         * If we are extending a component we need some different templates
         */

        if(extendComponent !== undefined) {
            data.extendComponent = parseInfo(extendComponent)

            templates.push(resolveTemplate('/component/extend/**'))
            templates.push(resolveTemplate('/component/*'))
            templates.push('!' + resolveTemplate('/component/create'))

            data.components.push(data.extendComponent)
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
                    interpolate: /{{([\s\S]+?)}}/g,
                    imports: {
                        notLast: function(index, array) {
                            return index !== array.length - 1
                        }
                    }
                }))
                .on('error', function (err) {
                    gutil.log(err.message)
                })
                .pipe(rename(function (path) {
                    if (path.basename === 'module') path.basename = name
                }))
                .pipe(gulp.dest(name))
                .pipe(print(function (path) {
                    console.log('created '.green + last(path.split('/')))
                }))
        })

        gulp.task('prettify', [ 'templates' ], function () {
            var files = path.join(process.cwd(), name) + '/*.{js,json}'

            return gulp.src(files)
                .pipe(prettify({
                    js: {
                        maxPreserveNewlines: 0,
                        preserveNewlines: false
                    }
                }))
                .pipe(gulp.dest(name))
        })

        gulp.task('all', [ 'prettify' ])

        gulp.start('all')
    }
});

module.exports = Create