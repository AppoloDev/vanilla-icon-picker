const iconPicker = new IconPicker('input', {
    theme: 'bootstrap-5',
    closeOnSelect: true
});

iconPicker.on('save', (evt) => {
    console.log(evt);
})
