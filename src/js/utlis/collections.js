const iconifyPath = 'https://raw.githubusercontent.com/iconify/collections-json/master/json';

export const collections = {
    'Material Design Icons': {
        key: 'mdi',
        prefix: 'mdi mdi-',
        url: `${iconifyPath}/mdi.json`
    },
    'FontAwesome Brands 6': {
        key: 'fa6-brands',
        prefix: 'fab fa-',
        url: `${iconifyPath}/fa6-brands.json`
    },
    'FontAwesome Solid 6': {
        key: 'fa6-solid',
        prefix: 'fas fa-',
        url: `${iconifyPath}/fa6-solid.json`

    },
    'FontAwesome Regular 6': {
        key: 'fa6-regular',
        prefix: 'far fa-',
        url: `${iconifyPath}/fa6-regular.json`
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

    console.log(collectionsOptions);

    if (Array.isArray(collectionsOptions)) {
        collectionsOptions.forEach((collection) => {
            if (hasCollection(collection)) {
                collectionResolved[collections[collection].key] = collections[collection]
            } else if (collection.key) {
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
