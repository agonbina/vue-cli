var ronin = require('ronin')

var program = ronin({
  path: __dirname,
  desc: 'Scaffold new Vue.js components, plugins, etc'
})

program.run()
