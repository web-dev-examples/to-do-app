export {};


declare global {
  export type Event_Callback_Function = (event: Event) => any;

  namespace Storage_Data {
    export interface To_Do__List {
      list_name: string,
      children_uuids: string[],
      open: boolean,
    }

    export interface To_Do__Item {
      parent_uuid: string,
      item_name: string
      description: string,
      checked: boolean,
      open: boolean,
    }
  }

  namespace Template_Elements {
    export interface To_Do__List {
      [key: string]: HTMLElement,
      button_add: HTMLButtonElement,
      button_delete: HTMLButtonElement,
      details: HTMLDetailsElement,
      input: HTMLInputElement,
      label_description: HTMLLabelElement,
      label_name: HTMLLabelElement,
      list_item: HTMLLIElement,
      unordered_list: HTMLUListElement,
      summary: HTMLElement,
      textarea: HTMLTextAreaElement,
    }

    export interface To_Do__Item {
      [key: string]: HTMLElement,
      button: HTMLButtonElement,
      container: HTMLDivElement,
      details: HTMLDetailsElement,
      heading: HTMLHeadingElement,
      input: HTMLInputElement,
      label: HTMLLabelElement,
      list_item: HTMLLIElement,
      summary: HTMLElement,
    }
  }
}

