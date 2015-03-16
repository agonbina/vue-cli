
## NOTE: this is still WIP so expect the behavior of specific commands to change

### Install
```
npm install -g vue-cli
```

##```vue component```

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
vue component create [componentName|String] --extend [componentToExtend|String]
```
Ex:
```bash
vue component create ui-alerts --extend ui-notifications
```
##### options
* **--components** or **-c** A comma separated list of private components for this component. Ex: ```--components ui-notifications,ui-names```
* **--mixins** or **-m** A comma separated list of mixins this component needs to use. Ex: ```--mixins firebase-mixin,sortable-mixin```


## ```vue mixin```
### Create a new mixin(TBD)
```bash
vue mixin create [mixinName|String]
```

## ```vue release```
Release a new version of a component, mixin etc. Using [semver](https://www.npmjs.com/package/semver), the current version will be upgraded based on the ```increment``` you specify.
Note: You must have [git-extras](https://github.com/tj/git-extras) installed for this command to work.
```bash
vue release [patch|[minor, major]]
```

## Global config
You can create a global or local configuration file for your options in your home, root or current directory, ex ```~/.vuerc```:

```js
{
    "author": "Your Name",
    "email": "youremail@blah.com",
    "git": {
        "username": "username",
        "host": "gitlab",
        "organization": "Github"
    }
}
```