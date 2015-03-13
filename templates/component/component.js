
<% if(mixins.length !== 0) { %>
    <% _.forEach(mixins, function (mixin) { %>
        var {{ _.camelCase(mixin) }} = require('{{ mixin }}')
    <% }) %>
<% } %>

module.exports = {

    name: '{{ name }}',

<% if(mixins.length !== 0) { %>
    mixins: [
      <% _.forEach(mixins, function (mixin) { %>
        {{ _.camelCase(mixin) }},
      <% }) %>
    ],
<% } %>

<% if(components.length !== 0) { %>
    components: {
    <% _.forEach(components, function(component) { %>
        '{{ component }}': require('{{ component }}'),
    <% }); %>
    },
<% } %>

    template: require('./template.jade')

}
