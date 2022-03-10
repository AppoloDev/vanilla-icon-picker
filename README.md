# Vanilla icon picker

![GitHub package.json version](https://img.shields.io/github/package-json/v/appolodev/icon-picker?color=blue&style=flat-square)
![npm](https://img.shields.io/npm/dm/vanilla-icon-picker?color=%2325b5ba&style=flat-square)
![GitHub](https://img.shields.io/github/license/appolodev/icon-picker?style=flat-square)

### Icons includes:

- FontAwesome 5 (Brands, Solid and Regular)
- Material Design Icons
- Iconoir

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

> ⚠️ Attention: If you use bootstrap theme dont forget to include bootstrap 5 css.

## Usage

```javascript
const iconPicker = new IconPicker('input', {
    // Options
});
```

[Live demo →](https://appolodev.github.io/vanilla-icon-picker/)

## Options

> 💙 You can find icons sets at [Iconify](https://github.com/iconify/icon-sets/tree/master/json)


```javascript
{
    // Change icon picker's theme
    theme: 'default' | 'bootstrap-5',

    // Set icon(s) library(ies)
    // iconSource: [
    //     'FontAwesome Brands 5', 
    //     'FontAwesome Solid 5', 
    //     'FontAwesome Regular 5', 
    //     'Material Design Icons', 
    //     'Iconoir', 
    //     {
    //         key: 'academicons',
    //         prefix: 'ai ai-',
    //         url: 'https://raw.githubusercontent.com/iconify/icon-sets/master/json/academicons.json'
    //     }
    // ]
    iconSource: [],

    // Close icon picker modal when icon is selected
    // If is `false` save button appear
    closeOnSelect: true,
    
    // Set a default value, preselect for example
    // icon's value and icon's name work
    defaultValue: null,
        
    // Translatable text
    i18n: {
        'input:placeholder': 'Search icon…',
            
        'text:title': 'Select icon',
        'text:empty': 'No results found…',
            
        'btn:save': 'Save'
    }
}
```

## Events

Use the `on(event, callback)` and `off(event, callback)` functions to bind / unbind eventlistener.

| Event          | Description                           | Arguments            |
| -------------- | -----------                           | ---------            |
| `select`       | Icon is selected, return icon value, name, svg and unicode if exist    | `Object`             |
| `save`         | Fired when saved with button or if `closeOnSelect` option is `true`, return return icon value, name, svg and unicode if exist | `Object`             |
| `show`         | Modal is shown                        | `IconPickerInstance` |
| `hide`         | Modal picker is hidden                | `IconPickerInstance` |

```javascript
iconPicker.on('select', instance => {
    console.log('Select:', instance);
});
```

## Methods

After we initialize IconPicker, we have access instance. Let's look list all available methods:

| Method                    | Description               |
| ------------------------- | ------------------------- |
| `on()`                    | Add event handler         |
| `off()`                   | Remove event handler      |
| `open()`                  | Open IconPicker's modal   |
| `hide()`                  | Remove IconPicker's modal |
| `isOpen()`                | Check if open or not      |
| `destroy(deleteInstance)` | Set it to false (by default it is true) to not to delete IconPicker instance |


## Licence

MIT Licence
