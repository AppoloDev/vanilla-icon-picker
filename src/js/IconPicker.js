import * as _ from "./utlis/utils";
import template from "./template";

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
                //@TODO: La recherche est cassé
                console.log('this.iconsAvailable', this.iconsAvailable);
                const iconResult = this.iconsAvailable.filter((obj) => {
                        console.log(obj);
                    }
                    //JSON.stringify(obj).toLowerCase().includes(evt.target.value.toLowerCase())
                );

                if (!iconResult.length) {
                    root.content.innerHTML = `<div class="is-empty">${options.i18n['text:empty']}</div>`;
                } else {
                    const emptyElement = root.content.querySelector('.empty');
                    if (emptyElement) {
                        emptyElement.remove();
                    }

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
        this._emit('save', {name: this.currentlySelectName, svg: this.SVGString});
    }

    /**
     * Generate icons elements
     * @private
     */
    async _buildIcons() {
        const {root, options} = this;
        let previousSelectedIcon = null;
        let icons;

        root.content.innerHTML = '';

        icons = await this._getIcons();

        icons.forEach((library) => {
            for (const [key, value] of Object.entries(library.icons)) {
                const iconTarget = document.createElement('button');
                iconTarget.className = `icon-element ${library.prefix}`;

                const iconElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                iconElement.setAttribute('height', '24');
                iconElement.setAttribute('width', '24');
                iconElement.setAttribute('viewBox', `0 0 ${value.width ? value.width : library.width} ${library.height}`);
                iconElement.classList.add(key);
                iconElement.innerHTML = value.body;

                iconTarget.append(iconElement)

                root.content.appendChild(iconTarget);

                iconTarget.addEventListener('click', (evt) => {
                    if (this.currentlySelectName !== evt.currentTarget.firstChild.className) {
                        evt.currentTarget.classList.add('is-selected');

                        this.currentlySelectElement = evt.currentTarget;
                        this.currentlySelectName = this.currentlySelectElement.firstChild.getAttribute('class');
                        this.SVGString = iconElement.outerHTML;

                        this._emit('select', {name: this.currentlySelectName, svg: this.SVGString});
                    }

                    if (previousSelectedIcon) {
                        previousSelectedIcon.classList.remove('is-selected');
                    }

                    if (options.closeOnSelect) {
                        this._onSave();
                    }

                    previousSelectedIcon = this.currentlySelectElement;
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

        if (options.iconSource.length > 0) {
            for (const iconKey of options.iconSource) {
                iconsURL.push(`${iconifyPath}/${iconKey}.json`)
            }
        }

        return await Promise.all(iconsURL.map((iconURL) => fetch(iconURL).then((response) => response.json())))
            .then((iconLibrary) => {
                return iconLibrary;
            });
    }
}
