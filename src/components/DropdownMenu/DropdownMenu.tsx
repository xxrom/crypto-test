import {Menu} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';

export const DropdownMenu = () => {
  return (
    <Menu>
      <Menu.Button>More</Menu.Button>
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Options
          <ChevronDownIcon
            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Menu.Items>
        <Menu.Item>
          {({active}) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings">
              Account settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({active}) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings">
              Documentation
            </a>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className="opacity-75">Invite a friend (coming soon!)</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
