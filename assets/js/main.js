'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Universally_Unique_Identifier_1;
const Static_Contract = () => (_ctor) => { };
let Universally_Unique_Identifier = Universally_Unique_Identifier_1 = class Universally_Unique_Identifier extends String {
    constructor() {
        super((() => {
            const newUUID = () => {
                const time_low = 'xxxxxxxx';
                const time_mid = 'xxxx';
                const time_hi_and_version = '4xxx';
                const clock_seq_hi_and_res__clock_seq_low = 'yxxx';
                const node_id = 'xxxxxxxxxxxx';
                return [
                    time_low,
                    time_mid,
                    time_hi_and_version,
                    clock_seq_hi_and_res__clock_seq_low,
                    node_id,
                ].map((chunk) => {
                    return chunk.replace(/[xy]/g, (c) => {
                        const random = Math.random() * 16 | 0;
                        if (c === 'x') {
                            return random.toString(16);
                        }
                        else {
                            return (random & 0x3 | 0x8).toString(16);
                        }
                    });
                }).join('-');
            };
            let uuid = newUUID();
            while (Universally_Unique_Identifier_1.generated_uuids.includes(uuid)) {
                uuid = newUUID();
            }
            Universally_Unique_Identifier_1.generated_uuids.push(uuid);
            return uuid;
        })());
    }
    static popUUID() {
        return this.generated_uuids.pop();
    }
};
Universally_Unique_Identifier.generated_uuids = [];
Universally_Unique_Identifier = Universally_Unique_Identifier_1 = __decorate([
    Static_Contract()
], Universally_Unique_Identifier);
if (typeof module !== 'undefined') {
    module.exports = { Universally_Unique_Identifier };
}
function assignElementsIds(elements, ids) {
    Object.entries(ids).forEach(([key, value]) => {
        const element = elements[key];
        if (element) {
            element.id = value;
        }
    });
}
;
function buildIdAttribute({ name, slug, uuid, }) {
    return `todo__${name}__${slug}__${uuid}`;
}
;
function buildToDoItemIds({ slug, uuid, }) {
    return {
        input: buildIdAttribute({ name: 'input', slug, uuid }),
        label: buildIdAttribute({ name: 'label', slug, uuid }),
        list_item: buildIdAttribute({ name: 'list_item', slug, uuid }),
    };
}
function buildToDoListIds({ slug, uuid, }) {
    return {
        summary: buildIdAttribute({ name: 'summary', slug, uuid }),
        input: buildIdAttribute({ name: 'input', slug, uuid }),
        label_description: buildIdAttribute({ name: 'label_description', slug, uuid }),
        label_name: buildIdAttribute({ name: 'label_name', slug, uuid }),
        unordered_list: buildIdAttribute({ name: 'unordered_list', slug, uuid }),
        textarea: buildIdAttribute({ name: 'textarea', slug, uuid }),
    };
}
function cloneTemplate(template_id) {
    const template = document.getElementById(template_id);
    if (!template) {
        throw new Error(`Cannot find template element with id -> ${template_id}`);
    }
    return template.content.cloneNode(true);
}
;
function collectToDoItemElements(clone) {
    return {
        button: clone.querySelector('button'),
        container: clone.querySelector('div'),
        details: clone.querySelector('details'),
        heading: clone.querySelector('h3'),
        input: clone.querySelector('input'),
        label: clone.querySelector('label'),
        list_item: clone.querySelector('li'),
        summary: clone.querySelector('summary'),
    };
}
function collectToDoListElements(clone) {
    return {
        button_add: clone.getElementById('template__button__add'),
        button_delete: clone.getElementById('template__button__delete'),
        details: clone.querySelector('details'),
        input: clone.querySelector('input'),
        label_description: clone.getElementById('template__label__description'),
        label_name: clone.getElementById('template__label__name'),
        list_item: clone.querySelector('li'),
        unordered_list: clone.querySelector('ul'),
        summary: clone.querySelector('summary'),
        textarea: clone.querySelector('textarea'),
    };
}
function newToDoItem({ item_name, checked = false, description = '', open = true, parent_container, uuid = '', UUID, todo_item__template_id, }) {
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
        };
        window.localStorage.setItem(elements['list_item'].dataset['uuid'], JSON.stringify(item_storage_data));
    }
    {
        const parent_container__uuid = parent_container.dataset['uuid'];
        const parent_container__storage_serialized_data = window.localStorage.getItem(parent_container__uuid);
        const parent_container__storage_parsed_data = JSON.parse(parent_container__storage_serialized_data);
        const children_uuids_set = new Set(parent_container__storage_parsed_data['children_uuids']);
        children_uuids_set.add(element_uuid);
        parent_container__storage_parsed_data['children_uuids'] = [...children_uuids_set];
        window.localStorage.setItem(parent_container__uuid, JSON.stringify(parent_container__storage_parsed_data));
    }
    if (open) {
        elements['details'].open = true;
    }
    else {
        elements['details'].open = false;
    }
    elements['label'].htmlFor = elements['input'].id;
    if (description) {
        elements['summary'].innerText = item_name;
        description.split('\n').forEach((line) => {
            if (!line) {
                return;
            }
            const paragraph = document.createElement('p');
            paragraph.innerText = line;
            elements['details'].append(paragraph);
        });
        elements['container'].removeChild(elements['heading']);
    }
    else {
        elements['heading'].innerText = item_name;
        elements['container'].removeChild(elements['details']);
    }
    elements['input'].addEventListener('change', (event) => {
        const input = event.target;
        const list = elements['list_item'].parentElement;
        list.removeChild(elements['list_item']);
        if (input.checked) {
            list.appendChild(elements['list_item']);
        }
        else {
            list.prepend(elements['list_item']);
        }
        const element_uuid = elements['list_item'].dataset['uuid'];
        const storage_serialized_data = window.localStorage.getItem(element_uuid);
        const storage_parsed_data = JSON.parse(storage_serialized_data);
        storage_parsed_data['checked'] = input.checked;
        window.localStorage.setItem(element_uuid, JSON.stringify(storage_parsed_data));
    });
    elements['details'].addEventListener('toggle', callback__detailsStoreToggle({ elements, element_uuid }));
    elements['button'].addEventListener('click', (_) => {
        const list = elements['list_item'].parentElement;
        list.removeChild(elements['list_item']);
        window.localStorage.removeItem(elements['list_item'].dataset['uuid']);
    });
    return elements['list_item'];
}
;
function newToDoList({ list_name, open = false, uuid = '', UUID, todo_list__template_id, todo_item__template_id, }) {
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
    };
    window.localStorage.setItem(element_uuid, JSON.stringify(storage_data));
    if (open) {
        elements['details'].open = true;
    }
    else {
        elements['details'].open = false;
    }
    elements['button_add'].addEventListener('click', (event) => {
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
        const storage_serialized_data = window.localStorage.getItem(elements['list_item'].dataset['uuid']);
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
        children_uuids_set.add(todo__item.dataset['uuid']);
        storage_parsed_data['children_uuids'] = [...children_uuids_set];
        window.localStorage.setItem(elements['list_item'].dataset['uuid'], JSON.stringify(storage_parsed_data));
    });
    elements['button_delete'].addEventListener('click', (event) => {
        elements['list_item'].querySelector('ul').childNodes.forEach((child) => {
            window.localStorage.removeItem(child.dataset['uuid']);
        });
        window.localStorage.removeItem(elements['list_item'].dataset['uuid']);
        const parent_element = elements['list_item'].parentElement;
        parent_element.removeChild(elements['list_item']);
        if (parent_element.childElementCount === 0) {
            parent_element.innerText = '';
        }
    });
    elements['details'].addEventListener('toggle', callback__detailsStoreToggle({ elements, element_uuid }));
    return elements['list_item'];
}
;
function restoreFromLocalStorage({ todo_list__template_id, todo_item__template_id, todo_collections_id, UUID, }) {
    Object.entries(window.localStorage).forEach(([key, value]) => {
        if (key.split('__')[0] !== 'todo_list') {
            return;
        }
        const uuid = key.split('__').splice(-1)[0];
        if (UUID.generated_uuids.includes(uuid)) {
            throw new Error(`Collision of UUIDs ${key}`);
        }
        else {
            UUID.generated_uuids.push(uuid);
        }
        const storage_data = JSON.parse(value);
        const todo_list = newToDoList({
            list_name: storage_data['list_name'],
            open: storage_data['open'],
            uuid,
            UUID,
            todo_list__template_id,
            todo_item__template_id,
        });
        const todo_list__unordered_list = todo_list.querySelector('ul');
        const todo_collections = document.getElementById(todo_collections_id);
        todo_collections.appendChild(todo_list);
        storage_data['children_uuids'].forEach((element_uuid) => {
            const uuid = element_uuid.split('__').splice(-1)[0];
            const { checked = false, description = '', item_name, open = true, } = JSON.parse(window.localStorage.getItem(element_uuid));
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
            }
            else {
                todo_list__unordered_list.prepend(list_item);
            }
        });
    });
}
function slugifyLine(line) {
    if (!line) {
        throw new Error(`Cannot slugify ${line}`);
    }
    return [...`${line}`.split('\n')[0]].splice(0, 80)
        .join('')
        .replace(/\s/g, '_')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase();
}
;
function callback__detailsStoreToggle({ elements, element_uuid, }) {
    return (event) => {
        const storage_serialized_data = window.localStorage.getItem(element_uuid);
        const storage_parsed_data = JSON.parse(storage_serialized_data);
        storage_parsed_data['open'] = elements['details'].open;
        window.localStorage.setItem(element_uuid, JSON.stringify(storage_parsed_data));
    };
}
window.addEventListener('load', (event) => {
    const todo_collections_id = 'todo_collections';
    const todo_list__template_id = 'template__todo_list__container';
    const todo_item__template_id = 'template__todo_list__item';
    const new_list__text = document.getElementById('todo__text__new_list');
    const todo_collections = document.getElementById('todo_collections');
    const new_list__button = document.getElementById('todo__button__new_list');
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
//# sourceMappingURL=main.js.map