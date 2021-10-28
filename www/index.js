const iconPicker = new IconPicker('input', {
    closeOnSelect: true
});

iconPicker.on('change', (evt) => {
    console.log(evt);
})
