/**
 * Resolves a HTMLElement by query.
 * @param val
 * @returns {null|Document|Element}
 */
export function resolveElement(val) {
    if (val instanceof HTMLElement) {
        return val;
    } else if (typeof val === 'string') {
        return document.querySelector(val)
    }

    return null;
}

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
export function stringToHTML(str) {
    if (window.DOMParser) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/html');
        return doc.body.firstElementChild;
    }

    const dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.firstElementChild;
}

/**
 * Check if item is an object
 * @param {Object} item
 * @returns {boolean}
 */
export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 *
 * @param target
 * @param source
 * @returns {Object}
 */
export function mergeDeep(target, source) {
    let output = Object.assign({}, target);

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}
