declare class IconPicker {
    constructor(el: String | HTMLElement, options: IconPicker.Options);

    on(event: IconPicker.EventType, callback: Function): IconPicker;

    hide(): void;

    open: void;

    isOpen(): boolean;
}

declare namespace IconPicker {
    interface Options {
        theme?: Theme,
        closeOnSelect?: boolean,
        i18n?: {
            'input:placeholder'?: string,
            'text:title'?: string,
            'text:empty'?: string,
            'btn:save'?: string
        }
    }

    type Theme = 'default';

    type EventType = 'init' | 'select' | 'save' | 'show' | 'hide';
}


