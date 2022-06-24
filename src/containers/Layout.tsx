import cx from "classnames";
import { MiniLink, PopoverLogin, PopoverSingUp } from "../components";
import { useStore } from "../hooks";
import { memo, useCallback } from "react";
import { theme } from "../theme";
import { Outlet } from "react-router-dom";
import { correctUserAuth } from "../tools/convert";
import { Button } from "../components/Button";

export const Layout = memo(() => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useStore();

  const onForceLogOut = useCallback(() => {
    setIsAuthorized(false);
    setUser({ email: "none", password: "none" });
  }, [setIsAuthorized, setUser]);

  const onForceLogIn = useCallback(() => {
    setIsAuthorized(true);
    setUser(correctUserAuth);
  }, [setIsAuthorized, setUser]);

  return (
    <div className={cx("flex flex-col min-h-screen ", theme.global.bg)}>
      <nav
        className={cx(
          "sticky top-0 z-40 max-w-screen py-2 text-sm font-medium text-gray-500 sm:py-4 ring-1 ring-gray-900 ring-opacity-5 shadow-sm",
          theme.global.bgSecondary
        )}
      >
        <ul className="flex justify-between px-4 mx-auto sm:px-6 lg:px-8 space-x-0 sm:space-x-10 lg:space-x-14">
          <div className="flex justify-around flex-1">
            <MiniLink to="/">Home</MiniLink>

            <MiniLink to="/trade" disabled={!isAuthorized}>
              Trade
            </MiniLink>

            <Button to="/trade" size="compact" variant="secondary">
              Hello
            </Button>
          </div>

          {isAuthorized ? (
            <div className="flex flex-col pl-2 overflow-x-auto justify-end items-center cursor-default">
              <div className="font-medium text-cyan-600">User info:</div>
              <div className="font-medium overflow-scrollX text-cyan-500">
                {user?.email}
              </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <PopoverLogin />
              <PopoverSingUp />
            </div>
          )}
        </ul>
      </nav>

      <main className="flex-1 w-full h-full p-4">
        <Outlet />
      </main>

      <footer
        className={cx(
          "w-full py-5 mx-auto text-sm text-center text-gray-500 max-w-container sm:py-8 sm:flex sm:items-center sm:justify-center",
          theme.global.bgSecondary
        )}
      >
        <div>Footer</div>

        <div>
          {isAuthorized ? (
            <button onClick={onForceLogOut} className="mx-4 text-purple-500">
              ForceLogOut
            </button>
          ) : (
            <button onClick={onForceLogIn} className="mx-4 text-purple-500">
              ForceLogIn
            </button>
          )}
        </div>
      </footer>
    </div>
  );
});
