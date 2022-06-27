import cx from "classnames";
import { memo } from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

export interface MiniLinkProps extends LinkProps {
  disabled?: boolean;
}

export const MiniLink = memo(
  ({ children, to, disabled = false, ...props }: MiniLinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <li className="flex items-center p-1">
        <Link
          className={cx(
            "text-neutral-100 bg-sky-800",
            "hover:text-neutral-200 hover:backdrop-cyan-sm rounded-xl px-5 py-2 sm:px-6",
            !disabled &&
              match &&
              "shadow-lg hover:shadow-cyan-300/50 bg-sky-800",
            disabled &&
              "!text-neutral-500 bg-sky-900 hover:shadow-none cursor-not-allowed"
          )}
          to={disabled ? "#" : to}
          {...props}
        >
          {children}
        </Link>
      </li>
    );
  }
);
