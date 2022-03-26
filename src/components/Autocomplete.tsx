import {Fragment, useState} from 'react';
import {Combobox, Transition} from '@headlessui/react';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';

const defaultItems: AutocompoleteProps['items'] = [
  {id: 1, value: 'Wade Cooper'},
  {id: 2, value: 'Arlene Mccoy'},
  {id: 3, value: 'Devon Webb'},
  {id: 4, value: 'Tom Cook'},
  {id: 5, value: 'Tanya Fox'},
  {id: 6, value: 'Hellen Schmidt'},
];

type ItemType = {
  id: number;
  value: string;
};

export type AutocompoleteProps = {
  items: Array<ItemType>;
};

export const Autocompolete = ({items = defaultItems}) => {
  const [selected, setSelected] = useState<ItemType>(items[0] || '');
  const [query, setQuery] = useState('');

  const filteredList =
    query === ''
      ? items
      : items.filter(item =>
          item.value
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <div className="relative">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
            <Combobox.Input
              className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
              displayValue={(person: any) => person.value}
              onChange={event => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}>
            <Combobox.Options
              className={`absolute z-40 w-full 
              py-1 mt-1 overflow-auto 
              text-base bg-white rounded-md shadow-lg shadow-cyan-400 max-h-60 
              ring-2 ring-cyan-800
              focus:outline-none 
              sm:text-sm`}>
              {filteredList.length === 0 && query !== '' ? (
                <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredList.map(item => (
                  <Combobox.Option
                    key={item.id}
                    className={({active}) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active ? 'text-white bg-teal-600' : 'text-gray-900'
                      }`
                    }
                    value={item}>
                    {({selected, active}) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}>
                          {item.value}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}>
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
