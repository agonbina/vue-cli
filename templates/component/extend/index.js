
exports.install = function (Vue) {
    Vue.use(require('{{ extendComponentName }}'))

    // Create the new component
    var definition = require('./component')
    var Extend = Vue.component('{{ extendComponentName }}')
    var Component = Extend.extend(definition)

    Vue.component('{{ name }}', Component)
}