
### Install
```
npm install -g vue-cli
```

## Create a new component
```bash
vue component create [componentName|String]
```
Ex:
```bash
vue component create ui-notifications
```

## Extend a component
```bash
vue component create [componentName|String] --extend [componentToExtend|String]
```
Ex:
```bash
vue component create ui-alerts --extend ui-notifications
```

#### options
* **--components** or **-c** A comma separated list of private components for this component. Ex: ```--components ui-notifications,ui-names```
* **--mixins** or **-m** A comma separated list of mixins this component needs to use. Ex: ```--mixins firebase-mixin,sortable-mixin```


## Create a new mixin
```bash
vue mixin create [mixinName|String]
```

## Global config
You can create a global or local configuration file for your options in your home, root or current directory, ex ```~/.vuerc```:

```js
{
    "author": "Your Name",
    "email": "youremail@blah.com",
    "git": {
        "username": "username",
        "remote": "https://github.com/vueui"
    }
}
```