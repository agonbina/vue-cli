
<% if(mixins.length !== 0) { %>
    <% _.forEach(mixins, function (mixin) { %>
        var {{ _.camelCase(mixin.name) }} = require('{{ mixin.name }}')
    <% }) %>
<% } %>

module.exports = {

    name: '{{ name }}',

<% if(mixins.length !== 0) { %>
    mixins: [
      <% _.forEach(mixins, function (mixin) { %>
        {{ _.camelCase(mixin.name) }},
      <% }) %>
    ],
<% } %>

<% if(components.length !== 0) { %>
    components: {
    <% _.forEach(components, function(component) { %>
        '{{ component.name }}': require('{{ component.name }}'),
    <% }); %>
    },
<% } %>

    template: require('./template.jade')

}
