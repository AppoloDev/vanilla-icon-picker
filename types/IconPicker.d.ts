declare class IconPicker {
    constructor(el: String | HTMLElement, options: IconPicker.Options);

    on(event: IconPicker.EventType, callback?: Function): IconPicker;

    off(event: IconPicker.EventType, callback?: Function): IconPicker;

    open(): void;

    hide(): void;

    isOpen(): boolean;

    iconsLoaded(): boolean;

    detroy(deleteInstance?: boolean): void;
}

declare namespace IconPicker {
    interface Options {
        theme: Theme,
        iconSource: Array<IconSource | {key: string, prefix: string, url: string}>,
        closeOnSelect?: boolean,
        defaultValue?: string,
        i18n?: {
            'input:placeholder'?: string,
            'text:title'?: string,
            'text:empty'?: string,
            'btn:save'?: string
        }
    }

    type Theme = 'default' | 'bootstrap-5';

    type IconSource = 'FontAwesome Brands 6' | 'FontAwesome Solid 6' | 'FontAwesome Regular 6' | 'Material Design Icons' | 'Iconoir'

    type EventType = 'select' | 'save' | 'show' | 'hide';
}


