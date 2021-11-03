const iconPicker = new IconPicker('input', {
    closeOnSelect: true
});

iconPicker.on('save', (evt) => {
    console.log(evt);
})
