
'use strict';


/**
 *
 * @dependents
 * - ts/assets/js/main.ts
 * - ts/assets/js/lib/restore-from-local-storage.ts
 *
 * @dependancies
 * - ts/assets/js/lib/assign-elements-ids.ts
 * - ts/assets/js/lib/callbacks/details-store-toggle.ts
 * - ts/assets/js/lib/collect-to-do-list-elements.ts
 * - ts/assets/js/lib/clone-template.ts
 * - ts/assets/js/lib/slugify-line.ts
 * - ts/assets/js/modules/universally-unique-identifier/ts/universally-unique-identifier.ts
 */
function newToDoList({
  list_name,
  open = false,
  uuid = '',
  UUID,
  todo_list__template_id,
  todo_item__template_id,
}: {
  list_name: string,
  open: boolean,
  uuid?: string,
  UUID: UUID.Static_Bits<Universally_Unique_Identifier>,
  todo_list__template_id: string,
  todo_item__template_id: string,
}): HTMLLIElement {
  if (!uuid) {
    uuid = `${new UUID()}`;
  }

  const clone = cloneTemplate(todo_list__template_id);

  const slug = slugifyLine(list_name);

  const elements = collectToDoListElements(clone);

  const ids = buildToDoListIds({ slug: slug, uuid: uuid });

  const element_uuid = `todo_list__${uuid}`;

  assignElementsIds(elements, ids);

  elements['list_item'].dataset['uuid'] = element_uuid;

  elements['summary'].innerText = list_name;

  elements['label_description'].htmlFor = ids['textarea'];

  elements['label_name'].htmlFor = ids['input'];

  const storage_data = {
    children_uuids: [],
    list_name,
    open,
  } as Storage_Data.To_Do__List;
  window.localStorage.setItem(element_uuid, JSON.stringify(storage_data));

  if (open) {
    elements['details'].open = true;
  } else {
    elements['details'].open = false;
  }

  elements['button_add'].addEventListener('click', (event: MouseEvent) => {
    const todo__item = newToDoItem({
      checked: false,
      description: elements['textarea'].value,
      item_name: elements['input'].value,
      open: true,
      parent_container: elements['list_item'],
      UUID,
      todo_item__template_id,
    });
    elements['unordered_list'].prepend(todo__item);

    const storage_serialized_data = window.localStorage.getItem(elements['list_item'].dataset['uuid'] as string);
    if (!storage_serialized_data) {
      throw new Error(`Cannot find localStorage data for ${elements['list_item'].dataset['uuid']}`);
    }

    const storage_parsed_data = JSON.parse(storage_serialized_data);
    if (!storage_parsed_data) {
      throw new Error(`Cannot parse data for ${elements['list_item'].dataset['uuid']}`);
    }

    const children_uuids_set = new Set(storage_parsed_data['children_uuids']);
    if (!children_uuids_set) {
      throw new Error(`Cannot find children UUIDs for ${elements['list_item'].dataset['uuid']}`);
    }
    children_uuids_set.add(todo__item.dataset['uuid'] as string);
    storage_parsed_data['children_uuids'] = [...children_uuids_set];

    window.localStorage.setItem(elements['list_item'].dataset['uuid'] as string, JSON.stringify(storage_parsed_data));
  });

  elements['button_delete'].addEventListener('click', (event: Event) => {
    (elements['list_item'].querySelector('ul') as HTMLUListElement).childNodes.forEach((child: HTMLLIElement) => {
      window.localStorage.removeItem(child.dataset['uuid'] as string);
    });
    window.localStorage.removeItem(elements['list_item'].dataset['uuid'] as string)

    const parent_element = elements['list_item'].parentElement as HTMLUListElement;
    parent_element.removeChild(elements['list_item']);
    if (parent_element.childElementCount === 0) {
      parent_element.innerText = '';
    }
  });

  elements['details'].addEventListener('toggle', callback__detailsStoreToggle({ elements, element_uuid }));

  return elements['list_item'];
};

