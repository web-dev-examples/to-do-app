
'use strict';


/**
 *
 * @dependents
 * - ts/assets/js/lib/new-to-do-list.ts
 * - ts/assets/js/lib/restore-from-local-storage.ts
 *
 * @dependancies
 * - ts/assets/js/lib/assign-elements-ids.ts
 * - ts/assets/js/lib/build-to-do-item-ids.ts
 * - ts/assets/js/lib/callbacks/details-store-toggle.ts
 * - ts/assets/js/lib/clone-template.ts
 * - ts/assets/js/lib/collect-to-do-item-elements.ts
 * - ts/assets/js/lib/slugify-line.ts
 * - ts/assets/js/modules/universally-unique-identifier/ts/universally-unique-identifier.ts
 */
function newToDoItem({
  item_name,
  checked = false,
  description = '',
  open = true,
  parent_container,
  uuid = '',
  UUID,
  todo_item__template_id,
}: {
  item_name: string,
  checked?: boolean,
  description?: string,
  open?: boolean,
  parent_container: HTMLLIElement,
  uuid?: string,
  UUID: UUID.Static_Bits<Universally_Unique_Identifier>,
  todo_item__template_id: string,
}): HTMLLIElement {
  if (!uuid) {
    uuid = `${new UUID()}`;
  }

  const clone = cloneTemplate(todo_item__template_id);

  const slug = slugifyLine(item_name);

  const elements = collectToDoItemElements(clone);

  const ids = buildToDoItemIds({ slug, uuid });

  assignElementsIds(elements, ids);

  if (checked) {
    elements['input'].checked = true;
  }

  const element_uuid = `list_item__${uuid}`;

  {
    elements['list_item'].dataset['uuid'] = element_uuid;
    const item_storage_data = {
      checked,
      description: encodeURIComponent(description),
      item_name: encodeURIComponent(item_name),
      open,
      parent_uuid: parent_container.dataset['uuid'],
    } as Storage_Data.To_Do__Item;
    window.localStorage.setItem(elements['list_item'].dataset['uuid'], JSON.stringify(item_storage_data));
  }

  {
    const parent_container__uuid = parent_container.dataset['uuid'] as string;
    const parent_container__storage_serialized_data = window.localStorage.getItem(parent_container__uuid) as string;
    const parent_container__storage_parsed_data = JSON.parse(parent_container__storage_serialized_data) as Storage_Data.To_Do__List;
    const children_uuids_set = new Set(parent_container__storage_parsed_data['children_uuids']);
    children_uuids_set.add(element_uuid);
    parent_container__storage_parsed_data['children_uuids'] = [...children_uuids_set];
    window.localStorage.setItem(parent_container__uuid, JSON.stringify(parent_container__storage_parsed_data));
  }

  if (open) {
    elements['details'].open = true;
  } else {
    elements['details'].open = false;
  }

  elements['label'].htmlFor = elements['input'].id;

  if (description) {
    elements['summary'].innerText = item_name;

    description.split('\n').forEach((line) => {
      if (!line) { return; }
      const paragraph = document.createElement('p');
      paragraph.innerText = line;
      elements['details'].append(paragraph);
    });

    elements['container'].removeChild(elements['heading'])
  } else {
    elements['heading'].innerText = item_name;
    elements['container'].removeChild(elements['details']);
  }

  elements['input'].addEventListener('change', (event: Event) => {
    const input = event.target as HTMLInputElement;
    const list = elements['list_item'].parentElement as HTMLUListElement;
    list.removeChild(elements['list_item']);
    if (input.checked) {
      list.appendChild(elements['list_item']);
    } else {
      list.prepend(elements['list_item']);
    }

    const element_uuid = elements['list_item'].dataset['uuid'] as string;
    const storage_serialized_data = window.localStorage.getItem(element_uuid) as string;
    const storage_parsed_data = JSON.parse(storage_serialized_data) as Storage_Data.To_Do__Item;
    storage_parsed_data['checked'] = input.checked;
    window.localStorage.setItem(element_uuid, JSON.stringify(storage_parsed_data));
  });

  elements['details'].addEventListener('toggle', callback__detailsStoreToggle({ elements, element_uuid }));

  elements['button'].addEventListener('click', (_) => {
    const list = elements['list_item'].parentElement as HTMLUListElement;
    list.removeChild(elements['list_item']);
    window.localStorage.removeItem(elements['list_item'].dataset['uuid'] as string);
  });

  return elements['list_item'];
};

