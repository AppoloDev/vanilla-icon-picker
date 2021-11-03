# Vanilla icon picker

![GitHub package.json version](https://img.shields.io/github/package-json/v/appolodev/icon-picker?color=blue&style=flat-square)
![GitHub](https://img.shields.io/github/license/appolodev/icon-picker?style=flat-square)

### Icons includes:

- Font Awesome 5

## Getting started

### Node

Install via npm or yarn

```bash
// NPM
npm i vanilla-icon-picker

// YARN
yarn add vanilla-icon-picker
```

```js
// One of the following themes
import 'vanilla-icon-picker/dist/themes/default.min.css'; // 'default' theme
import 'vanilla-icon-picker/dist/themes/bootstrap-5.min.css'; // 'bootstrap-5' theme

import IconPicker from 'vanilla-icon-picker';
```

> ⚠️ Attention: Don't forget to add font-awesome to preview the icons package and if you use bootstrap theme dont forget to include bootstrap 5 css.

## Usage

```javascript
const iconPicker = new IconPicker('input', {
    // Options
});
```

[Live demo →](https://appolodev.github.io/vanilla-icon-picker/)

## Options

```javascript
{
    // Change icon picker's theme
    theme: 'default',

        // Close icon picker modal when icon is selected
        // If is `false` save button appear
        closeOnSelect
:
    true,

        // Translatable text
        i18n
:
    {
        'input:placeholder'
    :
        'Search icon…',

            'text:title'
    :
        'Select icon',
            'text:empty'
    :
        'No results found…',

            'btn:save'
    :
        'Save'
    }
```

## Events

Use the `on(event, callback)` and `off(event, callback)` functions to bind / unbind eventlistener.

| Event          | Description                           | Arguments            |
| -------------- | -----------                           | ---------            |
| `init`         | Initialization done                   | `IconPickerInstance` |
| `select`       | Icon is selected, return icon name    | `string`             |
| `save`         | Fired when saved with button or if `closeOnSelect` option is `true`, return icon name | `string`             |
| `show`         | Modal is shown                        | `IconPickerInstance` |
| `hide`         | Modal picker is hidden                | `IconPickerInstance` |

```javascript
iconPicker.on('init', instance => {
    console.log('Init:', instance);
});
```

## Licence

MIT Licence
