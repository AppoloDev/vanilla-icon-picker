import * as _ from "./utlis/utils";
import template from "./template";

import ICON_SET from 'font-awesome-iconset';
import iconSet from '@iconify/json';
import {Collection} from "@iconify/json-tools";

export default class IconPicker {
    static DEFAULT_OPTIONS = {
        theme: 'default',
        closeOnSelect: true,
        iconSource: [],
        i18n: {
            'input:placeholder': 'Search icon…',

            'text:title': 'Select icon',
            'text:empty': 'No results found…',

            'btn:save': 'Save'
        }
    }

    _eventListener = {
        select: [],
        save: [],
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

        console.log(this.options.iconSource);

        if (this.element && this.options.iconSource.length > 0) {
            this._binEvents();
            this._buildIcons();
            this._createModal();
        }
    }

    _preBuild() {
        this.element = _.resolveElement(this.element);
        this.root = template(this.options);

        if (!Array.isArray(this.options.iconSource) && this.options.iconSource.length > 0) {
            this.options.iconSource = [this.options.iconSource];
        }
    }

    _binEvents() {
        const {options, root, element} = this;

        this._eventBindings = [
            _.addEvent(element, 'click', () => this.show()),
            _.addEvent(root.close, 'click', () => this.hide()),
            _.addEvent(root.modal, 'click', (evt) => {
                if (evt.target === root.modal) {
                    this.hide();
                }
            }),
            _.addEvent(root.search, 'keyup', (evt) => {
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
            this._eventBindings.push(_.addEvent(root.save, 'click', () => this._onSave()));
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

    /**
     * Destroy icon picker instance and detach all events listeners
     * @param {boolean} deleteInstance
     */
    destroy(deleteInstance = true) {
        this.initialized = false;

        // Remove elements events
        this._eventBindings.forEach(args => _.removeEvent(...args));

        // Delete instance
        if (deleteInstance) {
            Object.keys(this).forEach((key) => delete this[key]);
        }
    }

    _emit(event, ...args) {
        this._eventListener[event].forEach(cb => cb(...args, this));
    }

    on(event, callback) {
        if (this._eventListener[event] !== undefined) {
            this._eventListener[event].push(callback);
            return this;
        }

        return false
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
        const picker = this;

        document.body.appendChild(picker.root.modal);

        picker.initialized = true;
    }

    _onSave() {
        const {element} = this;

        if (element instanceof HTMLInputElement && this.currentlySelectName) {
            element.value = this.currentlySelectName;
        }

        this.hide();
        this._emit('save', this.currentlySelectName);
    }

    /**
     * Generate icons elements
     * @private
     */
    _buildIcons() {
        const {root, options} = this;
        let previousSelectedIcon = null;

        root.content.innerHTML = '';

        const icons = this._getIcons();

        icons.forEach((icon) => {
            const iconTarget = document.createElement('button');
            iconTarget.className = 'icon-element';

            const iconElement = document.createElement('i');
            iconElement.className = icon.value;

            iconTarget.append(iconElement)

            root.content.appendChild(iconTarget);

            iconTarget.addEventListener('click', (evt) => {
                if (this.currentlySelectName !== evt.currentTarget.firstChild.className) {
                    evt.currentTarget.classList.add('is-selected');

                    this.currentlySelectElement = evt.currentTarget;
                    this.currentlySelectName = this.currentlySelectElement.firstChild.className;

                    this._emit('select', this.currentlySelectName);
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

    /**
     *
     * @returns {string}
     * @private
     */
    _getIcons() {
        const {options} = this
        const iconsURL = [];

        /*if (options.iconSource.length > 1) {
            for (const iconKey of options.iconSource) {
                iconsURL.push(iconSource[iconKey].metadata)
            }
        } else {
            iconsURL.push(iconSource[options.iconSource].metadata)
        }*/

        let collection = new Collection();
        collection.loadIconifyCollection('iconoir', './node_modules/@iconify');

        console.log(collection);

        //console.log(iconSet.rootDir());

        //fetch(iconSet.locate('iconoir')).then((response)=> response).then((result) => console.log(result))

        /*Promise.all(iconsURL.map((iconURL) => fetch(iconURL).then((response) => response)))
            .then((result) => {
                console.log('result', result);
            })*/

        return 'foo';
    }
}
