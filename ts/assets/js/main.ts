
'use strict';


/**
 *
 * @dependancies
 * - ts/assets/js/lib/new-to-do-list.ts
 * - ts/assets/js/lib/restore-from-local-storage.ts
 * - ts/assets/js/modules/universally-unique-identifier/ts/universally-unique-identifier.ts
 */
window.addEventListener('load', (event) => {
  const todo_collections_id = 'todo_collections';
  const todo_list__template_id = 'template__todo_list__container';
  const todo_item__template_id = 'template__todo_list__item';

  const new_list__text = document.getElementById('todo__text__new_list') as HTMLInputElement;
  const todo_collections = document.getElementById('todo_collections') as HTMLUListElement;

  const new_list__button = document.getElementById('todo__button__new_list') as HTMLInputElement;
  new_list__button.addEventListener('click', (_) => {
    const new_list__name = new_list__text.value.length > 0 ? new_list__text.value : 'New To-Do List';
    const new_list = newToDoList({
      list_name: new_list__name,
      open: true,
      UUID: Universally_Unique_Identifier,
      todo_list__template_id,
      todo_item__template_id,
    });
    todo_collections.append(new_list);
  });

  restoreFromLocalStorage({
    todo_list__template_id,
    todo_item__template_id,
    todo_collections_id,
    UUID: Universally_Unique_Identifier,
  });
});

