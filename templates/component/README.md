{{ name }} ```v0.1.0```
================================

{{ description }}

### Installation
```bash
npm install --save {{ name }}
```

### Usage
```js
var Vue = require('vue');
var {{ _.camelCase(name) }} = require('{{ name }}');

Vue.use({{ _.camelCase(name) }})
```