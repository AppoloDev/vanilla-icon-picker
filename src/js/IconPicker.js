import * as _ from "./utlis/utils";
import template from "./template";

import ICON_SET from 'font-awesome-iconset';

export default class IconPicker {
    static DEFAULT_OPTIONS = {
        theme: 'default',
        closeOnSelect: true,
        i18n: {
            'input:placeholder': 'Search icon…',

            'text:title': 'Select icon',
            'text:empty': 'No results found…',

            'btn:save': 'Save'
        }
    }

    _eventListener = {
        init: [],
        onchange: [],
        onsave: [],
        show: [],
        hide: []
    };

    /**
     *
     * @param {string | HTMLElement} el
     * @param {Object} options
     */
    constructor(el, options = {}) {
        this.options = _.mergeDeep(IconPicker.DEFAULT_OPTIONS, options);
        this.element = el;

        // Initialize icon picker
        this._preBuild();

        if (this.element) {
            this._binEvents();
            this._buildIcons(ICON_SET);
            this._createModal();
        } else {
            throw new TypeError('The selector is not valid type or is null.');
        }

        this._emit('init');
    }

    _preBuild() {
        this.element = _.resolveElement(this.element);
        this.root = template(this.options);
    }

    _binEvents() {
        const {options, root, element} = this;

        this._eventBindings = [
            element.addEventListener('click', () => this.show()),
            root.close.addEventListener('click', () => this.hide()),
            root.modal.addEventListener('click', (evt) => {
                if (evt.target === root.modal) {
                    this.hide();
                }
            }),
            root.search.addEventListener('keyup', (evt) => {
                const iconResult = ICON_SET.filter((obj) =>
                    JSON.stringify(obj).toLowerCase().includes(evt.target.value.toLowerCase())
                );

                if (!iconResult.length) {
                    root.content.innerHTML = `<div class="is-empty">${options.i18n['text:empty']}</div>`;
                } else {
                    const emptyElement = root.content.querySelector('.empty');
                    if (emptyElement) emptyElement.remove();

                    this._buildIcons(iconResult);
                }
            })
        ];

        if (!options.closeOnSelect) {
            this._eventBindings.push(root.save.addEventListener('click', () => this._onSave()));
        }
    }

    /**
     * Hide icon picker modal
     */
    hide() {
        if (this.isOpen()) {
            this.root.modal.classList.remove('is-visible');
            this._emit('hide');

            return this;
        }

        return false
    }

    /**
     * Show icon picker modal
     */
    show() {
        if (!this.isOpen()) {
            this.root.modal.classList.add('is-visible');
            this._emit('show');

            return this;
        }

        return false
    }

    /**
     * Check if modal is open
     * @returns {boolean}
     */
    isOpen() {
        return this.root.modal.classList.contains('is-visible');
    }

    _emit(event, ...args) {
        this._eventListener[event].forEach(cb => cb(...args, this));
    }

    on(event, callback) {
        console.log('ON:EVENT', event);
        this._eventListener[event].push(callback);
        return this;
    }

    off(event, callback) {
        const callBacks = (this._eventListener[event] || []);
        const index = callBacks.indexOf(callback);

        if (~index) {
            callBacks.splice(index, 1);
        }

        return this;
    }

    _createModal() {
        document.body.appendChild(this.root.modal);
    }

    _onSave() {
        const {element} = this;

        if (element instanceof HTMLInputElement) {
            element.value = this.currentlySelectName;
        }

        this.hide();

        this._emit('onsave', this.currentlySelectName);
    }

    _buildIcons(icons) {
        const {root, options} = this;
        let previousSelectedIcon = null;

        root.content.innerHTML = '';

        icons.forEach((icon) => {
            const iconTarget = document.createElement('button');
            iconTarget.className = 'icon-target';

            const iconElement = document.createElement('i');
            iconElement.className = icon.value;

            iconTarget.append(iconElement)

            root.content.appendChild(iconTarget);

            iconTarget.addEventListener('click', (evt) => {
                if (this.currentlySelectName !== evt.currentTarget.firstChild.className) {
                    evt.currentTarget.classList.add('is-selected');

                    this.currentlySelectElement = evt.currentTarget;
                    this.currentlySelectName = this.currentlySelectElement.firstChild.className;

                    this._emit('onchange', this.currentlySelectName);
                }

                if (previousSelectedIcon) {
                    previousSelectedIcon.classList.remove('is-selected');
                }

                if (options.closeOnSelect) {
                    this._onSave();
                }

                previousSelectedIcon = this.currentlySelectElement;
            });
        });
    }
}
