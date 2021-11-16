import * as _ from "./utlis/utils";
import template from "./template";
import {resolveCollection} from "./utlis/collections";

const iconifyPath = 'node_modules/@iconify/json/json';

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

        if (this.element && this.options.iconSource.length > 0) {
            this._binEvents();
            this._renderdIcons();
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
        let iconsElements = [];

        this._eventBindings = [
            _.addEvent(element, 'click', () => this.show()),
            _.addEvent(root.close, 'click', () => this.hide()),
            _.addEvent(root.modal, 'click', (evt) => {
                if (evt.target === root.modal) {
                    this.hide();
                }
            }),
            _.addEvent(root.search, 'keyup', _.debounce((evt) => {
                const iconsResult = this.availableIcons.filter((obj) => obj.value.includes(evt.target.value.toLowerCase()));

                if (!iconsElements.length) {
                    iconsElements = document.querySelectorAll('.icon-element');
                }

                iconsElements.forEach((iconElement) => {
                    iconElement.hidden = true;

                    iconsResult.forEach((result) => {
                        if (iconElement.classList.contains(result.value)) {
                            iconElement.hidden = false;
                        }
                    });
                });

                if (iconsResult.length) {
                    const emptyElement = root.content.querySelector('.is-empty');

                    if (emptyElement) {
                        emptyElement.remove();
                    }
                } else {
                    root.content.appendChild(_.stringToHTML(`<div class="is-empty">${options.i18n['text:empty']}</div>`));
                }
            }, 250))
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
        document.body.appendChild(this.root.modal);

        this.initialized = true;
    }

    _onSave() {
        const {element} = this;

        if (element instanceof HTMLInputElement && this.currentlySelectName) {
            element.value = this.currentlySelectName;
        }

        this.hide();
        this._emit('save', {name: this.currentlySelectName, svg: this.SVGString});
    }

    /**
     * Generate icons elements
     * @private
     */
    async _renderdIcons() {
        const {root, options} = this;
        let previousSelectedIcon = null;
        let currentlySelectElement = null;
        this.availableIcons = [];

        root.content.innerHTML = '';

        let icons = await this._getIcons();

        icons.forEach((library) => {
            for (const [key, value] of Object.entries(library.icons)) {
                const iconTarget = document.createElement('button');
                iconTarget.className = 'icon-element';

                const iconElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                iconElement.setAttribute('height', '24');
                iconElement.setAttribute('width', '24');
                iconElement.setAttribute('viewBox', `0 0 ${value.width ? value.width : library.width} ${value.height ? value.height : library.height}`);
                iconElement.dataset.value = library.prefix + key
                iconElement.innerHTML = value.body;

                if (library.chars) {
                    iconElement.dataset.unicode = _.getKeyByValue(library.chars, key);
                }

                iconTarget.append(iconElement)

                root.content.appendChild(iconTarget);

                this.availableIcons.push({value: key, body: iconElement.outerHTML});

                // Icon click event
                iconTarget.addEventListener('click', (evt) => {
                    if (this.currentlySelectName !== evt.currentTarget.firstChild.className) {
                        let values = {}
                        evt.currentTarget.classList.add('is-selected');

                        currentlySelectElement = evt.currentTarget;
                        this.currentlySelectName = currentlySelectElement.firstChild.dataset.value;
                        this.SVGString = iconElement.outerHTML;

                        values = {
                            name: key,
                            value: this.currentlySelectName,
                            svg: this.SVGString,
                        }

                        if (library.chars) {
                            values = {...values, unicode: iconElement.dataset.unicode}
                        }

                        // TODO: select et save doivent renvoyer les mêmes données
                        this._emit('select', values);
                    }

                    if (previousSelectedIcon) {
                        previousSelectedIcon.classList.remove('is-selected');
                    }

                    if (options.closeOnSelect) {
                        this._onSave();
                    }

                    previousSelectedIcon = currentlySelectElement;
                });
            }
        });
    }

    /**
     *
     * @returns {string}
     * @private
     */
    async _getIcons() {
        const {options} = this
        const iconsURL = [];
        let sourceInformation = {};

        if (options.iconSource.length > 0) {
            for (const source of options.iconSource) {
                sourceInformation = resolveCollection(source);

                console.log('sourceInformation', sourceInformation);

                if (Array.isArray(sourceInformation.key)) {
                    sourceInformation.key.forEach(key => iconsURL.push(`${iconifyPath}/${key}.json`))
                } else {
                    iconsURL.push(`${iconifyPath}/${sourceInformation.key}.json`)
                }
            }
        }

        return await Promise.all(iconsURL.map((iconURL) => fetch(iconURL).then((response) => response.json())))
            .then((iconLibrary) => {
                // TODO: Pas le bon prefix quand il y a plus de 2 library
                iconLibrary.forEach((library) => {
                    library.prefix = sourceInformation.prefix
                })

                return iconLibrary;
            });
    }
}
