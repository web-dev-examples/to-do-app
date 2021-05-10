
'use strict';


/**
 *
 * @dependents
 * - ts/assets/js/lib/new-to-do-item.ts
 *
 * @dependancies
 * - ts/assets/lib/build-id-attribute.ts
 */
function buildToDoItemIds({
  slug,
  uuid,
}: {
  slug: string,
  uuid: string,
}) {
  return {
    input: buildIdAttribute({ name: 'input', slug, uuid }),
    label: buildIdAttribute({ name: 'label', slug, uuid }),
    list_item: buildIdAttribute({ name: 'list_item', slug, uuid }),
  }
}
