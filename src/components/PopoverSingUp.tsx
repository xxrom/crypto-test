import { Popover as HeadlessPopove } from "@headlessui/react";
import { memo, useCallback, useEffect, useState } from "react";
import { useStore } from "../hooks";
import { theme } from "../theme";
import cx from "classnames";
import { serverIP } from "../hooks/useData";
import { useQuery } from "react-query";
import { UserDataType } from "../slices";

export const PopoverSingUp = memo(() => {
  const { user, setUser, isAuthorized } = useStore();
  const [passwordTwo, setPasswordTwo] = useState("");
  const { email, password } = user;

  const {
    error: errorUser,
    isLoading: isLoadingUser,
    data: userData,
    refetch: refetchUser,
    //remove: removeCashe,
  } = useQuery<
    UserDataType & { accessToken: string; err?: { message: string } },
    any
  >(`userSingup_${email}_${password}`, () =>
    fetch(`${serverIP}/user/post-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json())
  );

  const [info, setInfo] = useState("");

  useEffect(() => {
    if (isLoadingUser) {
      return setInfo("Loading...");
    }
    if (errorUser) {
      return setInfo(`Error: ${errorUser?.message}`);
    }
    if (userData?.err?.message) {
      return setInfo(`ServerError: ${userData?.err?.message}`);
    }
  }, [userData, errorUser, isLoadingUser]);

  useEffect(() => {
    if (user?.email && user?.password) {
      setInfo("");
      refetchUser();
    }
  }, [refetchUser, user?.email, user?.password]);

  const onChangeEmail = useCallback(
    (event) => setUser({ ...user, email: event?.target?.value }),
    [setUser, user]
  );
  const onChangePassword = useCallback(
    (event) => setUser({ ...user, password: event?.target?.value }),
    [setUser, user]
  );
  const onChangePasswordTwo = useCallback(
    (event) => setPasswordTwo(event?.target?.value),
    []
  );
  const onClosePopover = useCallback((closeFn) => () => closeFn(), []);

  const onRegister = useCallback(
    (closeFn) => () => {
      if (isAuthorized) {
        closeFn();
      }
    },
    [isAuthorized]
  );

  return (
    <HeadlessPopove className="relative">
      <HeadlessPopove.Button>
        <span className={cx("font-medium !text-lg mx-1", theme.button.ghost)}>
          Sing-up
        </span>
      </HeadlessPopove.Button>
      <HeadlessPopove.Overlay className="bg-black opacity-10 fixed inset-0 z-40" />

      <HeadlessPopove.Panel className="absolute z-50">
        {({ close }) => (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        {`New user`}
                      </h3>

                      <div>{info ? `Info: ${info}` : "..."}</div>

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
                      "group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium",
                      theme.button.secondary
                    )}
                  >
                    Close
                  </button>
                  <button
                    onClick={onRegister(close)}
                    type="submit"
                    disabled={isLoadingUser || passwordTwo !== password}
                    className={cx(
                      "group relative w-1/2 sm:w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium",
                      theme.button.primary,
                      (passwordTwo !== password || isLoadingUser) &&
                        "text-black bg-neutral-400 hover:bg-neutral-300"
                    )}
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-purple-900 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        />
                      </svg>
                    </span>

                    {isLoadingUser ? "Loading" : "Sign-up"}
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
