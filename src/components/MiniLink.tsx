import cx from "classnames";
import { memo } from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import { theme } from "../theme";

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
            theme.button.link,
            match && "shadow-lg hover:shadow-cyan-300/50 bg-sky-800",
            disabled &&
              "!text-white !bg-neutral-100 hover:shadow-none cursor-default"
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
