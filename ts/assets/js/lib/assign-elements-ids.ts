
'use strict';


/**
 * Maps dictionary of elements to dictionary of ids
 *
 * @dependents
 * - ts/assets/js/lib/new-to-do-item.ts
 * - ts/assets/js/lib/new-to-do-list.ts
 */
function assignElementsIds(
  elements: { [key: string]: HTMLElement },
  ids: { [key: string]: string }
) {
  Object.entries(ids).forEach(([key, value]) => {
    const element = elements[key];
    if (element) {
      element.id = value;
    }
  });
};

