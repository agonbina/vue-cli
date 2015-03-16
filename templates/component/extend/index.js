
exports.install = function (Vue) {
    Vue.use(require('{{ extendComponent.name }}'))

    // Create the new component
    var definition = require('./component')
    var Extend = Vue.component('{{ extendComponent.name }}')
    var Component = Extend.extend(definition)

    Vue.component('{{ name }}', Component)
}