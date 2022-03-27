import {
  Outlet,
  Link,
  useMatch,
  useResolvedPath,
  LinkProps,
} from 'react-router-dom';
import cx from 'classnames';
import {theme} from '../theme';
import {PopoverLogin} from '../components';
import {useStore} from '../hooks';
import {memo} from 'react';

export const MinLink = ({
  children,
  to,
  disabled = false,
  ...props
}: LinkProps & {disabled?: boolean}) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({path: resolved.pathname, end: true});

  return (
    <li className="flex items-center">
      <Link
        className={cx(
          'text-lg hover:shadow-lg hover:shadow-cyan-400/50 backdrop-cyan-sm rounded-xl px-5 py-2 sm:px-6',
          match && 'text-cyan-700 shadow-lg shadow-cyan-300/50 ',
          disabled && 'text-neutral-400 hover:shadow-none cursor-default',
        )}
        to={disabled ? '#' : to}
        {...props}>
        {children}
      </Link>
    </li>
  );
};

export const Layout = memo(() => {
  const {isAuthorized, user} = useStore();

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-40 max-w-screen py-2 text-sm font-medium text-gray-500 bg-white sm:py-4 ring-1 ring-gray-900 ring-opacity-5 shadow-sm">
        <ul className="flex justify-between px-4 mx-auto sm:px-6 lg:px-8 space-x-0 sm:space-x-10 lg:space-x-14">
          <div className="flex justify-around flex-1">
            <MinLink to="/">Home</MinLink>

            <MinLink to="/trade" disabled={!isAuthorized}>
              Trade
            </MinLink>
          </div>

          {isAuthorized ? (
            <div className="flex flex-col pl-2 overflow-x-auto justify-end items-center cursor-default">
              <div className="font-medium text-cyan-800">User info:</div>
              <div className="font-medium overflow-scrollX text-cyan-900">
                {user?.email}
              </div>
            </div>
          ) : (
            <PopoverLogin>
              <button
                type="button"
                className={cx('font-medium text-lg', theme.button.primary)}>
                Log-in
              </button>
            </PopoverLogin>
          )}
        </ul>
      </nav>

      <main className="flex-1 w-full h-full p-4">
        <Outlet />
      </main>

      <footer className="w-full py-5 mx-auto text-sm text-center text-gray-500 border-t max-w-container sm:py-8 sm:flex sm:items-center sm:justify-center">
        Footer
      </footer>
    </div>
  );
});
