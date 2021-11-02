# Vanilla icon picker
![GitHub package.json version](https://img.shields.io/github/package-json/v/appolodev/icon-picker?color=blue&style=flat-square)
![GitHub](https://img.shields.io/github/license/appolodev/icon-picker?style=flat-square)

## Basic Usage
```bash
// NPM
npm i vanilla-icon-picker

// YARN
yarn add vanilla-icon-picker
```

```javascript
const iconPicker = new IconPicker('input', {
    // Options
});
```

[Live demo →](https://appolodev.github.io/vanilla-icon-picker/)

## Options
```javascript
    theme: 'default',
    closeOnSelect: true,
    i18n: {
        'input:placeholder': 'Search icon…',
    
        'text:title': 'Select icon',
        'text:empty': 'No results found…',
    
        'btn:save': 'Save'
    }
```

## Events
Use the `on(event, callback)` and `off(event, callback)` functions to bind / unbind eventlistener.

| Event          | Description                           | Arguments            |
| -------------- | -----------                           | ---------            |
| `init`         | Initialization done                   | `IconPickerInstance` |
| `onchange`     | Icon has changed, return icon name    | `string`             |
| `onsave`       | Icon has saved with button or if `closeOnSelect` the event is automatically fired , return icon name | `string`             |
| `show`         | Modal is shown                        | `IconPickerInstance` |
| `hide`         | Modal picker is hidden                | `IconPickerInstance` |

```javascript
iconPicker.on('init', instance => {
    console.log('Init:', instance);
});
```

## Licence
MIT Licence
