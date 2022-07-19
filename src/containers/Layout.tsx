import cx from "classnames";
import { MiniLink, PopoverLogin, PopoverSingUp } from "../components";
import { useStore } from "../hooks";
import { memo, useCallback } from "react";
import { btnColors } from "../theme";
import { Outlet } from "react-router-dom";
import { correctUserAuth } from "../tools/convert";
import styled, { css } from "styled-components";
import { Button } from "../components/Button";
import { useCookies } from "react-cookie";

export const Layout = memo(() => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useStore();
  const [cookies] = useCookies(["token"]);
  console.log("RENDER: Layout", isAuthorized);
  console.log("cookies", cookies);

  const onForceLogOut = useCallback(() => {
    setIsAuthorized(false);
    setUser({ email: "none", password: "none", token: "" });
  }, [setIsAuthorized, setUser]);

  const onForceLogIn = useCallback(() => {
    setIsAuthorized(true);
    setUser(correctUserAuth);
  }, [setIsAuthorized, setUser]);

  return (
    <Container minHeight="100vh" className={cx("flex flex-col min-h-screen ")}>
      <nav
        className={cx(
          "sticky top-0 z-40 max-w-screen py-2 text-sm font-medium text-gray-500 ring-1 ring-gray-900 ring-opacity-5 shadow-sm bg-sky-100"
        )}
      >
        <Menu>
          <Tabs className="flex justify-around flex-1">
            <MiniLink to="/">Home</MiniLink>

            <MiniLink to="/trade" disabled={!isAuthorized}>
              Trade
            </MiniLink>
          </Tabs>

          {isAuthorized ? (
            <div className="flex flex-col pl-2 overflow-x-auto justify-end items-center cursor-default">
              <div className="font-medium text-cyan-600">User info:</div>
              <div className="font-medium overflow-scrollX text-cyan-500">
                {user?.email}
              </div>
              <div className="font-medium overflow-scrollX text-cyan-500">
                {user?.token}
              </div>
              <div className="font-medium overflow-scrollX text-cyan-500">
                {cookies?.token}
              </div>
            </div>
          ) : (
            <div className="flex flex-row ml-4">
              <PopoverLogin />
              {/*<PopoverSingUp />*/}
            </div>
          )}
        </Menu>
      </nav>

      <main className="flex-1 w-full h-full p-4">
        <Outlet />
      </main>

      <Footer>
        <div>Footer</div>

        <div>
          {isAuthorized ? (
            <Button onClick={onForceLogOut}>ForceLogOut</Button>
          ) : (
            <Button onClick={onForceLogIn}>ForceLogIn</Button>
          )}
        </div>
      </Footer>
    </Container>
  );
});

const Container = styled.div<{ minHeight?: string }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  min-height: ${({ minHeight = "0" }) => minHeight};
`;

const Menu = styled(Container)`
  padding: 0.1rem 0.5rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Tabs = styled(Container)`
  justify-content: space-around;
  flex-direction: row;

  border-right: 1px solid ${btnColors.bgSecondary};
`;

const Footer = styled(Container)`
  padding: 1rem 5rem;
  font-size: 2rem;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  color: ${btnColors.secondary};
  background-color: ${btnColors.disabled};
`;
