
'use strict';


/**
 * 
 * @dependents
 * - ts/assets/js/lib/new-to-do-item.ts
 */
function collectToDoItemElements(clone: DocumentFragment): Template_Elements.To_Do__Item {
  return {
    button: clone.querySelector('button') as HTMLButtonElement,
    container: clone.querySelector('div') as HTMLDivElement,
    details: clone.querySelector('details') as HTMLDetailsElement,
    heading: clone.querySelector('h3') as HTMLHeadingElement,
    input: clone.querySelector('input') as HTMLInputElement,
    label: clone.querySelector('label') as HTMLLabelElement,
    list_item: clone.querySelector('li') as HTMLLIElement,
    summary: clone.querySelector('summary') as HTMLElement,
  }
}

