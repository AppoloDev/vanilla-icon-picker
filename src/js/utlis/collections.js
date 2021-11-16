export const collections = {
    'Material Design Icons': {
        key: 'mdi',
        prefix: 'mdi mdi-'
    },
    'FontAwesome 5': {
        key: ['fa-brands', 'fa-solid', 'fa-regular'],
    },
    'FontAwesome Brands 5': {
        key: 'fa-brands',
        prefix: 'fab fa-'
    },
    'FontAwesome Solid 5': {
        key: 'fa-solid',
        prefix: 'fas fa-'

    },
    'FontAwesome Regular 5': {
        key: 'fa-regular',
        prefix: 'far fa-'
    },
    'Iconoir': {
        key: 'iconoir',
        prefix: 'iconoir-'
    }
}

/**
 *
 * @param {string} collection
 */
export function resolveCollection(collection) {
    if (hasCollection(collection)) {
        return collections[collection]
    }

}

/**
 *
 * @param {string} collection
 * @returns {boolean}
 */
export function hasCollection(collection) {
    return collections.hasOwnProperty(collection)
}
