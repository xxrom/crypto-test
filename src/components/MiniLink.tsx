import cx from "classnames";
import { memo } from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import styled from "styled-components";

export interface MiniLinkProps extends LinkProps {
  disabled?: boolean;
  isSmall?: boolean;
}

export const MiniLink = memo(
  ({
    children,
    to,
    disabled = false,
    isSmall = false,
    ...props
  }: MiniLinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <Wrapper>
        <Link
          className={cx(
            "text-sky-100 bg-sky-800",
            `
            hover:text-neutral-200 hover:backdrop-cyan-sm rounded-xl 

            `,
            isSmall
              ? `
            px-3 py-2
            `
              : `
            px-3 py-2 sm:px-5 sm:py-4
            `,
            !disabled &&
              match &&
              "shadow-lg hover:shadow-cyan-300/50 bg-sky-700",
            disabled &&
              "!text-neutral-200 bg-neutral-400 hover:shadow-none cursor-not-allowed"
          )}
          to={disabled ? "#" : to}
          {...props}
        >
          {children}
        </Link>
      </Wrapper>
    );
  }
);

const Wrapper = styled.span`
  padding: 0.5rem;
`;
