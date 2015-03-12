
### Install
```
npm install -g vue-cli
```

### Create a new component
```bash
vue component create [componentName|String]
```
#### Options
* **-deps** A comma separated list of dependencies

### Extend a component
```bash
vue component extend [componentToExtend|String] [newComponent|String]
```

### Create a new mixin
```bash
vue mixin create [mixinName|String]
```

### Global config
You can create a global configuration file for your options in your home or root directory:
```~/.vuerc```:
```js
{
    "author": "Agon Bina",
    "email": "agon_bina@hotmail.com",
    "github": {
        "username": "agonbina",
        "remote": "https://github.com/vueui"
    }
}
```