
'use strict';


/**
 *
 * @dependents
 * - ts/assets/js/lib/new-to-do-list.ts
 *
 * @dependancies
 * - ts/assets/lib/build-id-attribute.ts
 */
function buildToDoListIds({
  slug,
  uuid,
}: {
  slug: string,
  uuid: string,
}): {
  summary: string,
  input: string,
  label_description: string,
  label_name: string,
  unordered_list: string,
  textarea: string,
} {
  return {
    summary: buildIdAttribute({ name: 'summary', slug, uuid }),
    input: buildIdAttribute({ name: 'input', slug, uuid }),
    label_description: buildIdAttribute({ name: 'label_description', slug, uuid }),
    label_name: buildIdAttribute({ name: 'label_name', slug, uuid }),
    unordered_list: buildIdAttribute({ name: 'unordered_list', slug, uuid }),
    textarea: buildIdAttribute({ name: 'textarea', slug, uuid }),
  }
}

