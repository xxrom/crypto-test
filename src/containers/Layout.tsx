import cx from "classnames";
import { MiniLink, PopoverLogin } from "../components";
import { useStore } from "../hooks";
import { memo, useCallback, useEffect } from "react";
import { btnColors } from "../theme";
import { Outlet, useNavigate } from "react-router-dom";
import { correctUserAuth } from "../tools/convert";
import styled from "styled-components";
import { Button } from "../components/Button";
import Cookies from "js-cookie";
import { useIsTokenValid } from "../api/token";

export const Layout = memo(() => {
  console.log("RENDER: Layout");

  const navigate = useNavigate();
  const {
    isAuthorized,
    setIsAuthorized,
    user,
    setUser,
    setUserEmail,
  } = useStore();

  const onForceLogOut = useCallback(() => {
    setIsAuthorized(false);
    setUser({ email: "none", password: "none", token: "none" });
    navigate("/");
  }, [navigate, setIsAuthorized, setUser]);

  const onForceLogIn = useCallback(() => {
    setIsAuthorized(true);
    setUser(correctUserAuth);
  }, [setIsAuthorized, setUser]);

  // Validate cookies accessToken
  const accessToken = Cookies.get("accessToken") || "";
  const isTokenValidData = useIsTokenValid(accessToken);
  const userEmail = isTokenValidData?.data?.email;
  const isTokenValid = typeof userEmail === "string";

  useEffect(() => {
    if (isTokenValid !== isAuthorized && userEmail) {
      setIsAuthorized(isTokenValid);
      setUserEmail(userEmail);
    } else if (!isTokenValidData) {
      console.log("forceLogOut");
      onForceLogOut();
    }
  }, [
    isAuthorized,
    isTokenValid,
    isTokenValidData,
    onForceLogOut,
    setIsAuthorized,
    setUserEmail,
    userEmail,
  ]);

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
              <ShrinkInfo>{user?.email}</ShrinkInfo>
              <ShrinkInfo>{accessToken}</ShrinkInfo>
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

const ShrinkInfo = styled.span`
  color: gray;
  font-size: 0.7rem;
  min-widht: 3rem;
  max-width: 7rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; /* force to show only one line */
`;
