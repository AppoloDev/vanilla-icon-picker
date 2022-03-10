// Icon picker with `bootstrap-5` theme
const iconPickerInput = new IconPicker('input', {
    theme: 'bootstrap-5',
    iconSource: [
        'Iconoir',
        'FontAwesome Solid 5',
        {
            key: 'academicons',
            prefix: 'ai ai-',
            url: 'https://raw.githubusercontent.com/iconify/icon-sets/master/json/academicons.json'
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
const iconPickerButton = new IconPicker('.btn', {
    theme: 'default',
    iconSource: ['FontAwesome Brands 5', 'FontAwesome Solid 5', 'FontAwesome Regular 5'],
    closeOnSelect: true
});

const iconElementButton = document.querySelector('.icon-selected-text');
iconPickerButton.on('select', (icon) => {
    iconElementButton.innerHTML = `Icon selected – name: <b>${icon.name}</b> & value: <b>${icon.value}</b>`;
});
