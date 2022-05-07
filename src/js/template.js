import {stringToHTML} from "./utlis/utils";

export default options => {
    const {theme, i18n, closeOnSelect} = options;

    const modalElement = getHTMLElements(`
        <div class="icon-picker-modal" tabindex="-1" data-theme="${theme}" data-element="modal" aria-modal="true" aria-labelledby="Icon picker modal" role="dialog">
            <div class="icon-picker-modal__dialog">
                <div class="icon-picker-modal__header" data-element="header">
                    ${typeof i18n['text:title'] === 'string' && i18n['text:title'] !== '' ? `<h2>${i18n['text:title']}</h2>` : ''}
                    
                    <button class="icon-picker-modal--close" aria-label="Close" data-interaction="close">
                        <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke-width="1.5">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M6.758 17.243 12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"/>
                        </svg>
                    </button>
                </div>
                
                <input placeholder="${i18n['input:placeholder']}" class="icon-picker-modal__search" aria-label="${i18n['input:placeholder']}" data-interaction="search">
                
                <div class="icon-picker-modal__content" data-element="content"></div>
            
                ${!closeOnSelect ? `
                    <div class="icon-picker-modal__footer" data-element="footer">
                        <button type="button" class="picker-save" data-interaction="save">${i18n['btn:save']}</button>
                    </div>` : ''
    }
            </div>
        </div>
    `);

    if (theme.includes('bootstrap')) {
        modalElement.save?.classList.add('btn', 'btn-primary');
        modalElement.search.classList.add('form-control');
    }

    return modalElement;
}


function getHTMLElements(str) {
    const removeAttribute = (el, name) => {
        const value = el.getAttribute(name);
        el.removeAttribute(name);
        return value;
    };

    const resolve = (element, base = {}) => {
        const elementKey = removeAttribute(element, 'data-element');
        elementKey && (base[elementKey] = element);

        for (const child of Array.from(element.children)) {
            const childInteractionKey = removeAttribute(child, 'data-interaction');

            if (childInteractionKey) {
                childInteractionKey && (base[childInteractionKey] = child);
            }

            resolve(child, base);
        }

        return base;
    };

    return resolve(stringToHTML(str));
}
