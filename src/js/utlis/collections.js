export const collections = {
    'Material Design Icons': {
        key: 'mdi',
        prefix: 'mdi mdi-'
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
 * @param {array} collectionsOptions
 */
export function resolveCollection(collectionsOptions) {
    let collectionResolved = Object.create({});

    if (Array.isArray(collectionsOptions)) {
        collectionsOptions.forEach((collection) => {
            if (hasCollection(collection)) {
                collectionResolved[collections[collection].key] = collections[collection]
            }
        })
    }

    return collectionResolved;
}

/**
 *
 * @param {string} collection
 * @returns {boolean}
 */
function hasCollection(collection) {
    return collections.hasOwnProperty(collection)
}
