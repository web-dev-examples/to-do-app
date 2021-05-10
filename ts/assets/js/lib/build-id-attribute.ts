
'use strict';


/**
 *
 * @dependents
 * - ts/assets/js/lib/build-to-do-list-ids.ts
 * - ts/assets/js/lib/build-to-do-item-ids.ts
 */
function buildIdAttribute({
  name,
  slug,
  uuid,
}: {
  name: string,
  slug: string,
  uuid: string,
}): string {
  return `todo__${name}__${slug}__${uuid}`;
};

