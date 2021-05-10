
'use strict';


/**
 *
 * @dependents
 * - ts/assets/js/main.ts
 *
 * @dependancies
 * - ts/assets/js/lib/assign-elements-ids.ts
 * - ts/assets/js/lib/collect-to-do-list-elements.ts
 */
function restoreFromLocalStorage({
  todo_list__template_id,
  todo_item__template_id,
  todo_collections_id,
  UUID,
}: {
  todo_list__template_id: string,
  todo_item__template_id: string,
  todo_collections_id: string,
  UUID: UUID.Static_Bits<Universally_Unique_Identifier>,
}) {
  Object.entries(window.localStorage).forEach(([key, value]) => {
    if (key.split('__')[0] !== 'todo_list') { return; }

    const uuid = key.split('__').splice(-1)[0];
    if (UUID.generated_uuids.includes(uuid)) {
      throw new Error(`Collision of UUIDs ${key}`);
    } else {
      UUID.generated_uuids.push(uuid);
    }

    const storage_data = JSON.parse(value) as Storage_Data.To_Do__List;

    const todo_list = newToDoList({
      list_name: storage_data['list_name'],
      open: storage_data['open'],
      uuid,
      UUID,
      todo_list__template_id,
      todo_item__template_id,
    });

    const todo_list__unordered_list = todo_list.querySelector('ul') as HTMLUListElement;

    const todo_collections = document.getElementById(todo_collections_id) as HTMLUListElement;
    todo_collections.appendChild(todo_list);

    storage_data['children_uuids'].forEach((element_uuid) => {
      const uuid = element_uuid.split('__').splice(-1)[0];

      const {
        checked = false,
        description = '',
        item_name,
        open = true,
      } = JSON.parse(window.localStorage.getItem(element_uuid) as string) as Storage_Data.To_Do__Item;

      const list_item = newToDoItem({
        checked,
        description: decodeURIComponent(description),
        item_name: decodeURIComponent(item_name),
        open,
        parent_container: todo_list,
        uuid,
        UUID,
        todo_item__template_id,
      });

      if (checked) {
        todo_list__unordered_list.appendChild(list_item);
      } else {
        todo_list__unordered_list.prepend(list_item);
      }
    });
  });
}

