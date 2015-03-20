
var fs = require('fs-extra'),
    config = require('rc')('vue'),
    colors = require('gulp-util').colors

function readPkgJson() {
    var pkg = fs.readJsonSync('./package.json', {throws: false})

    if (!pkg) throw new Error('package.json empty or not found')

    return pkg
}

function updatePkgJson(data, cb) {
    fs.writeJSON('./package.json', data, function (err) {
        if(err) {
            throw new Error(err.message)
        }
        cb()
    })
}

function getGitUrl(name, version) {
    var url = 'git+ssh://git@'
    var gitConfig = config['git']

    url += gitConfig.host + '.com:' + gitConfig.organization + '/'
    url += name + '.git'

    if (version !== '') url += '#' + version

    return url
}

function parseDependency(dependency) {
    var info = dependency.split('#'),
        name = info[0],
        version = info[1] || ''

    return {
        name: name,
        version: version,
        git: getGitUrl(name, version)
    }
}

module.exports = {
    getGitUrl: getGitUrl,
    parseDependency: parseDependency,
    readPkgJson: readPkgJson,
    updatePkgJson: updatePkgJson,
    colors: {
        info: colors.bold.blue,
        warn: colors.bold.red,
        success: colors.bold.green
    }
}

