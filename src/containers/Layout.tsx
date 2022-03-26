import {
  Outlet,
  Link,
  useMatch,
  useResolvedPath,
  LinkProps,
} from 'react-router-dom';
import cx from 'classnames';

const MinLink = ({children, to, ...props}: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({path: resolved.pathname, end: true});

  return (
    <li className="flex items-center">
      <Link
        className={cx(
          'text-lg hover:shadow-lg hover:shadow-cyan-400/50 backdrop-cyan-sm rounded-lg p-2',
          match && 'text-cyan-700 shadow-lg shadow-cyan-300/50 ',
        )}
        to={to}
        {...props}>
        {children}
      </Link>
    </li>
  );
};

export const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <nav className="sticky top-0 z-40 bg-white text-sm font-medium text-gray-900 py-8 ring-1 ring-gray-900 ring-opacity-5 shadow-sm">
      <ul className="flex mx-auto px-4 sm:px-6 lg:px-8 justify-between space-x-5 sm:space-x-10 lg:space-x-14">
        <div className="flex flex-1 justify-around">
          <MinLink to="/">Home</MinLink>

          <MinLink to="/trade">Trade</MinLink>
        </div>

        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-lg font-medium text-cyan-900 bg-cyan-100 border border-transparent rounded-md hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
          onClick={() => {}}>
          Log-in
        </button>
      </ul>
    </nav>

    <main className="w-full h-full flex-1 p-4">
      <Outlet />
    </main>

    <footer className="w-full max-w-container mx-auto border-t py-10 text-center text-sm text-gray-500 sm:flex sm:items-center sm:justify-center">
      Footer
    </footer>
  </div>
);
