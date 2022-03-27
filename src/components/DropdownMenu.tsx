import {Menu} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';
import cx from 'classnames';
import {theme} from '../theme';

export const DropdownMenu = () => {
  return (
    <Menu>
      <Menu.Button className={cx(theme.button.secondary)}>
        Actions:
        <ChevronDownIcon
          className="w-5 h-5 ml-2 -mr-1 text-cyan-800"
          aria-hidden="true"
        />
      </Menu.Button>

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
