import { Home, Trade } from "../pages";
import { Layout } from "../containers";
import { memo, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useStore, useUserLogin } from "../hooks";
import { ErrorBoundary } from "../components/ErrorBoundary";

export type ProtectedRouteProps = {
  redirectPath?: string;
  children: React.ReactNode;
};

const ProtectedRoute = memo(
  ({ redirectPath = "/", children }: ProtectedRouteProps) => {
    const { isAuthorized } = useStore();

    if (!isAuthorized) {
      console.info("User unAuthorized: redirected to home page");

      return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
  }
);

export const MyRoutes = memo(() => {
  console.log("RENDER: MyRoutes");

  const { setIsAuthorized, isAuthorized, fetchRawData } = useStore();
  const { data: dataUser } = useUserLogin();

  useEffect(() => {
    fetchRawData();
  }, []);

  useEffect(() => {
    if (dataUser?.accessToken && !isAuthorized) {
      console.log("setIsAuthorized");
      setIsAuthorized(true);
    }
  }, [dataUser?.accessToken, setIsAuthorized, isAuthorized]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="trade"
              element={
                <ProtectedRoute>
                  <Trade />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
});
