import {Home, Trade} from '../pages';
import {Layout} from '../containers';
import {memo, useEffect} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {useStore, useUser} from '../hooks';

export type ProtectedRouteProps = {
  redirectPath?: string;
  children: React.ReactNode;
};

const ProtectedRoute = memo(
  ({redirectPath = '/', children}: ProtectedRouteProps) => {
    const {isAuthorized} = useStore();

    if (!isAuthorized) {
      console.info('User unAuthorized: redirected to home page');

      return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
  },
);

export const MyRoutes = memo(() => {
  const {setIsAuthorized, user} = useStore();
  const {isLoading, error, data} = useUser(user);
  console.log('user', data, error, isLoading);

  useEffect(() => {
    if (data?.accessToken) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [data?.accessToken, setIsAuthorized]);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
});
