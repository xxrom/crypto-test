import styled, { css } from "styled-components";
import classnames from "classnames";
import colors from "tailwindcss/colors";
// TODO: tw, {css } imports !!!
import tw, { TwStyle } from "twin.macro";
import { FC, ReactNode, useCallback } from "react";

export type ResultCSS = ReturnType<typeof css> | ReturnType<typeof tw>;
export type StateProp = "default" | "warning" | "danger" | "success";
export type VariantProp = "primary" | "secondary"; // | "ghost";
export type SizeProp = "normal" | "compact" | "small";
export type ButtonSizeMods = Record<SizeProp, ResultCSS>;

export interface ButtonProps {
  variant?: VariantProp;
  size?: SizeProp;
  state?: StateProp;
  className?: string | ResultCSS | TwStyle;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  children?: ReactNode;
}

export type ColorsKeys =
  | "primary"
  | "secondary"
  | "bgPrimary"
  | "bgSecondary"
  | "bgHover"
  | "disabled";
export const btnColors: { [key in ColorsKeys]: string } = {
  primary: colors.sky["600"],
  bgPrimary: colors.sky["100"],
  secondary: colors.gray["500"],
  bgSecondary: colors.slate["300"],
  bgHover: colors.sky["700"],
  disabled: colors.neutral["800"],
};

/**
 * Базовая кнопка, на которую накладываются модификаторы
 */
const ButtonBase = styled.button`
  position: relative;
  border: 1px solid transparent;
  border-radius: 12px;
  font: 500 16px/24px "Roboto", sans-serif;
  letter-spacing: 0.015em;
  transition: background-color 0.15s linear, color 0.15s linear;
  cursor: pointer;
  text-decoration: none;

  &:disabled {
    cursor: not-allowed;
  }
`;

// StyledBtn - fixing classNames from props
const StyledBtn = styled(ButtonBase)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${btnColors.primary};

  ${(props) => props.className};
`;

interface ButtonMods {
  variant: {
    [variantName in VariantProp]: {
      base: ResultCSS;
      state?: { [stateName in StateProp]: ResultCSS };
    };
  };
}

export const buttonMods: ButtonMods = {
  variant: {
    primary: {
      base: css`
        color: ${btnColors.primary};
        background-color: ${btnColors.bgPrimary};
        border: 1px solid ${btnColors.primary};

        &:hover,
        &:focus,
        &:active {
          color: ${btnColors.bgHover};
          border: 1px solid ${btnColors.bgHover};
        }

        &:disabled {
          background-color: ${btnColors.bgSecondary};
        }
      `,
      state: {
        default: css``,

        warning: css``,

        danger: css``,

        success: css``,
      },
    },

    secondary: {
      base: css`
        color: ${btnColors.secondary};
        background-color: ${btnColors.bgSecondary};
        border: 1px solid ${btnColors.secondary};

        &:hover,
        &:focus,
        &:active {
          color: ${btnColors.bgHover};
          border: 1px solid ${btnColors.bgHover};
        }

        &:disabled {
          border-color: ${btnColors.primary};
          color: ${btnColors.secondary};
        }
      `,
      state: {
        default: css``,

        warning: css``,

        danger: css``,

        success: css``,
      },
    },
  },
};
/**
 * Модификаторы размера кнопки
 **/
export const buttonSizeMods: ButtonSizeMods = {
  normal: css`
    padding: 15px 23px; /* -1px с учетом обводок */
  `,

  compact: css`
    padding: 7px 15px; /* -1px с учетом обводок */
  `,

  small: css`
    padding: 5px 15px; /* -1px с учетом обводок */
    font-size: 14px;
    line-height: 20px;
  `,
};

export const Button: FC<ButtonProps> = (props) => {
  const {
    variant = "primary",
    size = "compact",
    state = "default",
    className,
    disabled,
    onClick,
    children,
    ...rest
  } = props;

  const handleClick = useCallback(
    (event) => {
      onClick && onClick(event);
    },
    [onClick]
  );

  const buttonStyles = buttonMods.variant[variant];

  return (
    <StyledBtn
      {...rest}
      onClick={handleClick}
      disabled={disabled}
      className={classnames(
        className,
        buttonSizeMods[size],

        buttonStyles.base,
        buttonStyles.state && buttonStyles.state[state]
      )}
    >
      {children}
    </StyledBtn>
  );
};
