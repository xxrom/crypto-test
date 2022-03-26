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
    <Link
      style={{textDecoration: match ? 'underline' : 'none'}}
      className={cx(match && ' text-blue-700')}
      to={to}
      {...props}>
      {children}
    </Link>
  );
};

export const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <nav className="sticky top-0 z-40 bg-white text-sm font-medium text-gray-900 py-5 ring-1 ring-gray-900 ring-opacity-5 shadow-sm">
      <ul className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex space-x-5 sm:space-x-10 lg:space-x-14">
        <li>
          <MinLink to="/">Home</MinLink>
        </li>

        <li>
          <MinLink to="/trade">Trade</MinLink>
        </li>
      </ul>
    </nav>

    <main className="w-full h-full flex-1">
      <Outlet />
    </main>

    <footer className="w-full max-w-container mx-auto border-t py-10 text-center text-sm text-gray-500 sm:flex sm:items-center sm:justify-center">
      Footer
    </footer>
  </div>
);
