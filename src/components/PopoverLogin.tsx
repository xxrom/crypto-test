import { Popover as HeadlessPopove } from "@headlessui/react";
import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks";
import { theme } from "../theme";
import cx from "classnames";
import { useUserLogin } from "../hooks/useData";

export const PopoverLogin = memo(() => {
  const {
    isAuthorized,
    user,
    setUser,
    setIsAuthorized,
    setUserToken,
  } = useStore();
  console.log("PopoverLogin", user);

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("12341234");
  const navigate = useNavigate();

  const queryUser = useUserLogin(user);
  console.log("queryUser", queryUser);
  const token = queryUser?.data?.token;

  const [info, setInfo] = useState("");

  useEffect(() => {
    console.log("isStatus", queryUser.isSuccess);
    if (!queryUser.isSuccess) {
      return;
    }

    console.log("token", token);

    if (typeof token !== "string") {
      return;
    }

    setUserToken(token);
    setIsAuthorized(true);
    navigate("/");
    console.log("navigate to =>>> /");
  }, [token, queryUser.isSuccess, setIsAuthorized, setUserToken, navigate]);

  useEffect(() => {
    if (queryUser.isLoading) {
      return setInfo("Loading...");
    }
    if (queryUser.error) {
      return setInfo(`Error ${queryUser.error?.message}`);
    }
    if (queryUser?.data?.err?.message) {
      return setInfo(`Error ${queryUser?.data?.err?.message}`);
    }
  }, [
    isAuthorized,
    queryUser?.data?.err?.message,
    queryUser.error,
    queryUser.isLoading,
  ]);

  const onChangeEmail = useCallback(
    (event) => setEmail(event?.target?.value),
    []
  );
  const onChangePassword = useCallback(
    (event) => setPassword(event?.target?.value),
    []
  );
  const onClosePopover = useCallback((closeFn) => () => closeFn(), []);

  const onLogin = useCallback(
    (_closeFn) => () => {
      setUser({ email, password, token: "" });
      setInfo("");
    },
    [email, password, setUser]
  );

  return (
    <HeadlessPopove className="relative">
      <HeadlessPopove.Button>
        <span className={cx("font-medium !text-lg mx-1", theme.button.primary)}>
          Log-in
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
            <div className="flex items-center justify-center m-4 text-center">
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

              <div className="relative inline-block align-center align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-xl">
                <div className="bg-white mx-12 my-8 flex flex-center">
                  <div className="flex flex-col w-full text-center">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {`Enter your eMail and password`}
                    </h3>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {`Email and password:`}
                      </p>
                    </div>
                    <div className="mt-8">
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
                    <div className="mt-3">
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

                <div className="flex flex-col">
                  <div className="flex justify-center">{`Status: ${queryUser?.status}`}</div>
                  <div className="flex justify-center">
                    {info ? `Info: ${info}` : "..."}
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 flex justify-between">
                  <button
                    onClick={onLogin(close)}
                    type="submit"
                    disabled={queryUser.isLoading}
                    className={cx(
                      "group relative w-1/2 sm:w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium",
                      theme.button.primary,
                      queryUser.isLoading &&
                        "text-neutral-400 bg-neutral-400 hover:bg-neutral-300"
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
                    {queryUser.isLoading ? "Loading" : "Log-in"}
                  </button>

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
                </div>
              </div>
            </div>
          </div>
        )}
      </HeadlessPopove.Panel>
    </HeadlessPopove>
  );
});
