
### Install
```
npm install -g vue-cli
```

### Global options
* **--deps or -d** A comma separated list of dependencies. Ex: **--deps ui-notifications,ui-names,listview-mixin**

### Create a new component
```bash
vue component create [componentName|String]
```
Ex:
```bash
vue component create ui-notifications
```

### Extend a component
```bash
vue component extend [componentToExtend|String] [newComponent|String]
```
Ex:
```bash
vue component extend ui-notifications
```

### Create a new mixin
```bash
vue mixin create [mixinName|String]
```

### Global config
You can create a global or local configuration file for your options in your home, root or current directory, ex ```~/.vuerc```:

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