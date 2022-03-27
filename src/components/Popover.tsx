import {Popover as HeadlessPopove} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';
import {memo, useCallback, useEffect, useState} from 'react';
import {MinLink} from '../containers/Layout';
import {useStore, useUser} from '../hooks';
import {theme} from '../theme';

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
        <ChevronDownIcon className="w-5 h-5 text-cyan-100" aria-hidden="true" />
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

/*
 
<button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
      

                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title">
                      Create new user
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Email and password:
                      </p>
                    </div>
                    <div className="mt-2">
                      <label className="sr-only">Email address</label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                      />
                    </div>

 */

type PopoverPriceProps = {
  asset?: string;
  price?: string | number;
  children: React.ReactNode;
};

export const PopoverLogin = memo(({children}: PopoverPriceProps) => {
  const {isAuthorized, user, setUser} = useStore();
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');

  const {error, isLoading, data} = useUser(user);
  const [info, setInfo] = useState('');

  const onChangeEmail = useCallback(
    event => setEmail(event?.target?.value),
    [],
  );
  const onChangePassword = useCallback(
    event => setPassword(event?.target?.value),
    [],
  );

  useEffect(() => {
    console.log('error2:', error, data);

    if (isLoading) {
      return setInfo('Loading...');
    }
    if (error && error?.message) {
      return setInfo(`Error: ${error?.message}`);
    }
    if (data?.err?.message) {
      return setInfo(`Error: ${data?.err?.message}`);
    }

    if (!isAuthorized) {
      setInfo('Something wrong... =)');
    }
  }, [data, error, isAuthorized, isLoading]);

  const onRegister = useCallback(
    closeFn => () => {
      setUser({email, password});

      if (isAuthorized) {
        closeFn();
      }
    },
    [email, isAuthorized, password, setUser],
  );

  return (
    <HeadlessPopove className="relative">
      <HeadlessPopove.Button>{children}</HeadlessPopove.Button>
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
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title">
                        Create new user:
                      </h3>

                      <div>{info ? `Info: ${info}` : '...'}</div>

                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Email and password:
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
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={onRegister(close)}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path
                          fill-rule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                    Sign in
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
