
'use strict';


/**
 *
 * @dependents
 * - ts/assets/js/lib/new-to-do-item.ts
 * - ts/assets/js/lib/new-to-do-list.ts
 */
function callback__detailsStoreToggle({
  elements,
  element_uuid,
}: {
  elements: (Template_Elements.To_Do__List | Template_Elements.To_Do__Item),
  element_uuid: string,
}): Event_Callback_Function {
  return (event) => {
    const storage_serialized_data = window.localStorage.getItem(element_uuid) as string;
    const storage_parsed_data = JSON.parse(storage_serialized_data) as (Storage_Data.To_Do__List | Storage_Data.To_Do__Item);
    storage_parsed_data['open'] = elements['details'].open;
    window.localStorage.setItem(element_uuid, JSON.stringify(storage_parsed_data));
  };
}
