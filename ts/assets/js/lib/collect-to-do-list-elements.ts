
'use strict';


/**
 *
 * @dependents
 * - ts/assets/js/lib/new-to-do-list.ts
 */
function collectToDoListElements(clone: DocumentFragment): Template_Elements.To_Do__List {
  return {
    button_add: clone.getElementById('template__button__add') as HTMLButtonElement,
    button_delete: clone.getElementById('template__button__delete') as HTMLButtonElement,
    details: clone.querySelector('details') as HTMLDetailsElement,
    input: clone.querySelector('input') as HTMLInputElement,
    label_description: clone.getElementById('template__label__description') as HTMLLabelElement,
    label_name: clone.getElementById('template__label__name') as HTMLLabelElement,
    list_item: clone.querySelector('li') as HTMLLIElement,
    unordered_list: clone.querySelector('ul') as HTMLUListElement,
    summary: clone.querySelector('summary') as HTMLElement,
    textarea: clone.querySelector('textarea') as HTMLTextAreaElement,
  };
}

