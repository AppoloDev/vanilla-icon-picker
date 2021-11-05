// Icon picker with `bootstrap-5` theme
const iconPickerInput = new IconPicker('input', {
    theme: 'bootstrap-5',
    iconSource: ['FontAwesome-5', 'Iconoir'],
    closeOnSelect: true
});

const iconElementInput = document.querySelector('.input-group-text');
iconPickerInput.on('select', (icon) => {
    iconElementInput.className = `input-group-text ${icon}`;
});

// Icon picker with `default` theme
const iconPickerButton = new IconPicker('.btn', {
    theme: 'default',
    closeOnSelect: true
});

const iconElementButton = document.querySelector('.icon-selected-text');
iconPickerButton.on('select', (icon) => {
    iconElementButton.innerText = `Icon selected: ${icon}`;
});
