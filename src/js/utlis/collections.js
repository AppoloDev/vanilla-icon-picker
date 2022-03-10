const iconifyPath = 'https://raw.githubusercontent.com/iconify/collections-json/master/json';

export const collections = {
    'Material Design Icons': {
        key: 'mdi',
        prefix: 'mdi mdi-',
        url: `${iconifyPath}/mdi.json`
    },
    'FontAwesome Brands 5': {
        key: 'fa-brands',
        prefix: 'fab fa-',
        url: `${iconifyPath}/fa-brands.json`
    },
    'FontAwesome Solid 5': {
        key: 'fa-solid',
        prefix: 'fas fa-',
        url: `${iconifyPath}/fa-solid.json`

    },
    'FontAwesome Regular 5': {
        key: 'fa-regular',
        prefix: 'far fa-',
        url: `${iconifyPath}/fa-regular.json`
    },
    'Iconoir': {
        key: 'iconoir',
        prefix: 'iconoir-',
        url: `${iconifyPath}/iconoir.json`
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
            } else {
                collectionResolved[collection.key] = collection
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
