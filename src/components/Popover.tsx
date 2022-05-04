import {Popover as HeadlessPopove} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';
import {memo, useCallback, useEffect, useState} from 'react';
import {MinLink} from '../containers/Layout';
import {useStore} from '../hooks';
import {theme} from '../theme';
import cx from 'classnames';
import {useUserLogin, useUserSingup} from '../hooks/useData';

export type PopoverBuySellProps = {
  symbol: string;
};
export const PopoverBuySell = memo(({symbol}: PopoverBuySellProps) => {
  const {setToAsset, setFromAsset} = useStore();

  const onClickBuy = useCallback(() => setToAsset(symbol), [
    setToAsset,
    symbol,
  ]);
  const onClickSell = useCallback(() => setFromAsset(symbol), [
    setFromAsset,
    symbol,
  ]);

  return (
    <HeadlessPopove className="relative">
      <HeadlessPopove.Button className={theme.button.secondary}>
        <ChevronDownIcon
          className="w-3 h-3 sm:w-5 sm:h-5 text-cyan-100"
          aria-hidden="true"
        />
      </HeadlessPopove.Button>
      <HeadlessPopove.Overlay className="bg-black opacity-10 fixed inset-0 z-40" />

      <HeadlessPopove.Panel className="absolute z-50 -ml-5">
        <div className="relative mt-1 flex rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
          <div className="flex flex-col p-2">
            <MinLink onClick={onClickBuy} to="/trade">
              Buy
            </MinLink>
            <MinLink onClick={onClickSell} to="/trade">
              Sell
            </MinLink>
          </div>
        </div>
      </HeadlessPopove.Panel>
    </HeadlessPopove>
  );
});

export const PopoverLogin = memo(() => {
  const {isAuthorized, user, setUser} = useStore();
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const {
    error,
    isLoading: isLoadingUser,
    data: userData,
    refetch: refetchUser,
    remove: removeCashe,
  } = useUserLogin();
  const [info, setInfo] = useState('');

  useEffect(() => {
    if (isLoadingUser) {
      return setInfo('Loading...');
    }
    if (error) {
      return setInfo(`Error ${error?.message}`);
    }
    if (userData?.err?.message) {
      return setInfo(`Error ${userData?.err?.message}`);
    }

    if (!isAuthorized) {
      setInfo('Something wrong... =)');
    }
  }, [userData, error, isAuthorized, isLoadingUser]);

  const onChangeEmail = useCallback(
    event => setEmail(event?.target?.value),
    [],
  );
  const onChangePassword = useCallback(
    event => setPassword(event?.target?.value),
    [],
  );
  const onClosePopover = useCallback(closeFn => () => closeFn(), []);

  const onLogin = useCallback(
    closeFn => () => {
      setUser({email, password});
      setInfo('');

      if (isAuthorized) {
        closeFn();
      } else {
        removeCashe();
        new Promise((resolve: any) => resolve()).then(() => refetchUser());
      }
    },
    [email, isAuthorized, password, refetchUser, removeCashe, setUser],
  );

  return (
    <HeadlessPopove className="relative">
      <HeadlessPopove.Button>
        <span className={cx('font-medium !text-lg mx-1', theme.button.primary)}>
          Log-in
        </span>
      </HeadlessPopove.Button>
      <HeadlessPopove.Overlay className="bg-black opacity-10 fixed inset-0 z-40" />

      <HeadlessPopove.Panel className="absolute z-50">
        {({close}) => (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"></div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true">
                &#8203;
              </span>

              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title">
                        {`Enter your info`}
                      </h3>

                      <div>{info ? `Info: ${info}` : '...'}</div>

                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {`Email and password:`}
                        </p>
                      </div>
                      <div className="mt-2">
                        <label className="sr-only">Email address:</label>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          value={email}
                          onChange={onChangeEmail}
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="admin@gmail.com"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="sr-only">Password:</label>
                        <input
                          id="password"
                          name="password"
                          type="text"
                          value={password}
                          onChange={onChangePassword}
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="adminadmin"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex sm:flex-row-reverse justify-between">
                  <button
                    onClick={onClosePopover(close)}
                    type="submit"
                    className={cx(
                      'group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium',
                      theme.button.secondary,
                    )}>
                    Close
                  </button>
                  <button
                    onClick={onLogin(close)}
                    type="submit"
                    disabled={isLoadingUser}
                    className={cx(
                      'group relative w-1/2 sm:w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium',
                      theme.button.primary,
                      isLoadingUser &&
                        'text-neutral-400 bg-neutral-400 hover:bg-neutral-300',
                    )}>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-purple-900 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        />
                      </svg>
                    </span>
                    {isLoadingUser ? 'Loading' : 'Log-in'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </HeadlessPopove.Panel>
    </HeadlessPopove>
  );
});

export const PopoverSingUp = memo(() => {
  const {setUser, isAuthorized} = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');

  const {
    error,
    isLoading: isLoadingUser,
    data: userData,
    refetch: refetchUser,
    remove: removeCashe,
  } = useUserSingup();
  const [info, setInfo] = useState('');

  useEffect(() => {
    if (isLoadingUser) {
      return setInfo('Loading...');
    }
    if (error) {
      return setInfo(`Error ${error?.message}`);
    }
    if (userData?.err?.message) {
      return setInfo(`Error ${userData?.err?.message}`);
    }
  }, [userData, error, isLoadingUser]);

  const onChangeEmail = useCallback(
    event => setEmail(event?.target?.value),
    [],
  );
  const onChangePassword = useCallback(
    event => setPassword(event?.target?.value),
    [],
  );
  const onChangePasswordTwo = useCallback(
    event => setPasswordTwo(event?.target?.value),
    [],
  );
  const onClosePopover = useCallback(closeFn => () => closeFn(), []);

  const onRegister = useCallback(
    closeFn => () => {
      setUser({email, password});
      setInfo('');

      if (isAuthorized) {
        closeFn();
      } else {
        removeCashe();
        new Promise((resolve: any) => resolve()).then(() => refetchUser());
      }
    },
    [email, isAuthorized, password, refetchUser, removeCashe, setUser],
  );

  return (
    <HeadlessPopove className="relative">
      <HeadlessPopove.Button>
        <span className={cx('font-medium !text-lg mx-1', theme.button.ghost)}>
          Sing-up
        </span>
      </HeadlessPopove.Button>
      <HeadlessPopove.Overlay className="bg-black opacity-10 fixed inset-0 z-40" />

      <HeadlessPopove.Panel className="absolute z-50">
        {({close}) => (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"></div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true">
                &#8203;
              </span>

              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title">
                        {`New user`}
                      </h3>

                      <div>{info ? `Info: ${info}` : '...'}</div>

                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {`Email and password:`}
                        </p>
                      </div>
                      <div className="mt-2">
                        <label className="sr-only">Email address:</label>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          value={email}
                          onChange={onChangeEmail}
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="email"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="sr-only">Password:</label>
                        <input
                          id="password"
                          name="password"
                          type="text"
                          value={password}
                          onChange={onChangePassword}
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="password"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="sr-only">Password again:</label>
                        <input
                          id="password"
                          name="password"
                          type="text"
                          value={passwordTwo}
                          onChange={onChangePasswordTwo}
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="password again"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex sm:flex-row-reverse justify-between">
                  <button
                    onClick={onClosePopover(close)}
                    type="submit"
                    className={cx(
                      'group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium',
                      theme.button.secondary,
                    )}>
                    Close
                  </button>
                  <button
                    onClick={onRegister(close)}
                    type="submit"
                    disabled={isLoadingUser || passwordTwo !== password}
                    className={cx(
                      'group relative w-1/2 sm:w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium',
                      theme.button.primary,
                      isLoadingUser &&
                        'text-black bg-neutral-400 hover:bg-neutral-300',
                    )}>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-purple-900 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        />
                      </svg>
                    </span>

                    {isLoadingUser ? 'Loading' : 'Sign-up'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </HeadlessPopove.Panel>
    </HeadlessPopove>
  );
});
