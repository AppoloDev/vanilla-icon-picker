// Icon picker with `bootstrap-5` theme
const iconPickerInput = new IconPicker('input', {
    theme: 'bootstrap-5',
    iconSource: [
        'Iconoir',
        'FontAwesome Solid 6',
        {
            key: 'gg',
            prefix: 'gg-',
            url: 'https://raw.githubusercontent.com/iconify/icon-sets/master/json/gg.json'
        }
    ],
    closeOnSelect: true
});

const iconElementInput = document.querySelector('.input-group-text');
iconPickerInput.on('select', (icon) => {
    console.log('Icon Selected', icon);

    if (iconElementInput.innerHTML !== '') {
        iconElementInput.innerHTML = '';
    }

    iconElementInput.className = `input-group-text ${icon.name}`;
    iconElementInput.innerHTML = icon.svg;
});

// Icon picker with `default` theme
