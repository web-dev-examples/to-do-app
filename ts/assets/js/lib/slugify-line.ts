
'use strict';


/**
 *
 * @dependents
 * - ts/assets/js/lib/new-to-do-item.ts
 * - ts/assets/js/lib/new-to-do-list.ts
 */
function slugifyLine(line: string): string {
  if (!line) {
    throw new Error(`Cannot slugify ${line}`);
  }
  return [...`${line}`.split('\n')[0]].splice(0, 80)
                                      .join('')
                                      .replace(/\s/g, '_')
                                      .replace(/[^a-zA-Z0-9-]/g, '')
                                      .toLowerCase();
};

