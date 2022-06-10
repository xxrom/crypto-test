import classnames from "classnames";
import { forwardRef, ReactNode, useCallback, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { themeColors } from "../common/collors";
import { useForkRef } from "../hooks/useForkRef";
import { hex2rgba } from "../tools/hex2rgba";

/**
 * Результат выполнения css``; из пакета linaria.
 * Для описания интерфейсов модификаторов.
 */
export type ResultCSS = ReturnType<typeof css>;

/**
 * Нативные пропсы ButtonBase
 **/
export type ButtonBaseProps = React.ComponentProps<typeof ButtonBase>;

/**
 * Варианты кнопок
 **/
export type VariantProp = "primary" | "secondary" | "ghost";

/**
 * Состояния кнопок
 **/
export type StateProp = "default" | "warning" | "danger" | "success";

/**
 * Размеры кнопок
 **/
export type SizeProp = "compact" | "small";

/**
 * Выравнивание иконки внутри кнопки
 **/
type IconAlignments = "left" | "right";

/**
 * Тип лоадера в кнопке
 * global - на всю кнопку
 * local  - вместо иконки
 **/
type LoadingStyles = "global" | "local";

/**
 * Тип модификаторов стиля лоадера
 **/
type LoadingStylesMods = Record<LoadingStyles, ResultCSS>;

/**
 * Тип модификаторов размера кнопки
 **/
export type ButtonSizeMods = Record<SizeProp, ResultCSS>;

/**
 * Тип модификаторов расположения иконки внутри кнопки
 **/
type IconAlignmentMods = Record<IconAlignments, ResultCSS>;

/**
 * Интерфейс модификаторов кнопки
 */
interface ButtonMods {
  variant: {
    [variantName in VariantProp]: {
      base: ResultCSS;
      state?: { [stateName in StateProp]: ResultCSS };
    };
  };
}

/**
 * Интерфейс палитры цветов для состояний кнопок
 **/
interface StatePalette {
  base: string;
  hover: string;
  active: string;
}

// Styles ----------------------------------------------------------------------

/*
 * Неглобальный className, добавляемый кнопке только в состоянии лоадинга.
 * Нужен для удобного применения лоадинг стилей внутри модификаторов.
 **/
const loadingClassName = css`
  visibility: visible;
`;

/**
 * Палитра общих цветов
 */
export const commonPalette = {
  white: String(themeColors.neutral.White),
  blue: String(themeColors.primary.normal),
  lightGray: String(themeColors.neutral.Mischka),
  gray: String(themeColors.neutral.Manatee),
  darkGray: String(themeColors.neutral.Shark),
};

/**
 * Палитра цветов состояний
 */
export const statePalettes: Record<StateProp, StatePalette> = {
  default: {
    base: String(themeColors.primary.normal),
    hover: String(themeColors.primary.hover),
    active: String(themeColors.blue.ResolutionBlue),
  },
  warning: {
    base: String(themeColors.orange.CarrotOrange),
    hover: String(themeColors.system.warning),
    active: String(themeColors.orange.Tawny),
  },
  danger: {
    base: String(themeColors.red.Pomegranate),
    hover: String(themeColors.system.error),
    active: String(themeColors.red.Thunderbird),
  },
  success: {
    base: String(themeColors.green.GreenHaze),
    hover: String(themeColors.green.PigmentGreen),
    active: String(themeColors.green.FunGreen),
  },
};

/**
 * Темизаторы
 **/
const iconTheme = (fillColor: string) => `
  svg path {
    fill: ${fillColor};
  }
`;

const loaderIconTheme = (circleColor: string, progressColor: string) => `
  svg {
    circle {
      stroke: ${circleColor};
    }
    path {
      fill: ${progressColor};
    }
  }
`;

const primaryButtonTheme = ({ base, hover, active }: StatePalette) => `
  background-color: ${base};

  &:enabled {
    &:hover {
      background-color: ${hover};
    }

    &:active {
      background-color: ${active};
    }
  }
`;

const secondaryButtonTheme = ({ base, hover, active }: StatePalette) => `
  color: ${base};
  border-color: ${base};

  &:enabled:hover,
  &:focus {
    background-color: ${base};
  }

  &:focus:hover {
    background-color: ${hover};
  }

  &:focus:active {
    background-color: ${active};
  }

  &.${loadingClassName} {
    background-color: ${base};
  }
`;

/**
 * Стили на :focus у всех кнопок одинаковые
 **/
const commonFocusStyles = `
  &:before,
  &:after {
    content: '';
    position: absolute;
    opacity: 0;
    transition: border-width 0.15s linear, opacity 0.15s linear;
    pointer-events: none;
  }

  &:before {
    top: 1px;
    right: 1px;
    bottom: 1px;
    left: 1px;
    border: 0 solid #fff;
    border-radius: 1px;
  }

  &:after {
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    border: 0 solid #2375e1;
    border-radius: 3px;
  }

  &:focus {
    outline: none;

    &:before {
      opacity: 1;
      border-width: 1px;
    }

    &:after {
      opacity: 1;
      border-width: 2px;
    }
  }
`;

/**
 * Базовая кнопка, на которую накладываются модификаторы
 */
export const ButtonBase = styled.button`
  position: relative;
  margin: 0;
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

const StyledButton = styled(ButtonBase)`
  display: inline-flex;
  align-items: center;

  ${(props) => props.className};
`;

const IconWrapper = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;

  & > svg {
    flex-shrink: 0;
  }
`;

const loaderIconStyles = css`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -12px 0 0 -12px;
  animation: spin 0.75s infinite linear;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSVG = styled.svg`
  ${loaderIconStyles};
`;

const LoaderIcon: JSX.Element = (
  <LoadingSVG
    width="24"
    height="24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke={hex2rgba(commonPalette.white, 0.4)}
      strokeWidth="2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 12a8 8 0 00-8-8V2c5.523 0 10 4.477 10 10h-2z"
      fill={commonPalette.white}
    />
  </LoadingSVG>
);

const buttonIconStyles = css`
  ${iconTheme("currentColor")}
`;

// Modifiers -------------------------------------------------------------------

/**
 * Модификаторы размера кнопки
 **/
export const buttonSizeMods: ButtonSizeMods = {
  compact: css`
    padding: 7px 15px; /* -1px с учетом обводок */
  `,

  small: css`
    padding: 5px 15px; /* -1px с учетом обводок */
    font-size: 14px;
    line-height: 20px;
  `,
};

/**
 * Модификаторы кнопки
 **/
export const buttonMods: ButtonMods = {
  variant: {
    primary: {
      base: css`
        color: ${commonPalette.white};
        ${commonFocusStyles}

        &:disabled {
          background-color: ${commonPalette.gray};
        }
      `,
      state: {
        default: css`
          ${primaryButtonTheme(statePalettes.default)}
        `,

        warning: css`
          ${primaryButtonTheme(statePalettes.warning)}
        `,

        danger: css`
          ${primaryButtonTheme(statePalettes.danger)}
        `,

        success: css`
          ${primaryButtonTheme(statePalettes.success)}
        `,
      },
    },

    secondary: {
      base: css`
        background-color: ${commonPalette.white};
        ${commonFocusStyles}

        &:hover,
        &:focus,
        &:active {
          color: ${commonPalette.white};
        }

        &:disabled {
          border-color: ${commonPalette.gray};
          color: ${commonPalette.gray};
        }

        &.${loadingClassName} {
          /* background-color меняется в state стилях */
          color: ${commonPalette.white};
        }
      `,
      state: {
        default: css`
          ${secondaryButtonTheme(statePalettes.default)}
        `,

        warning: css`
          ${secondaryButtonTheme(statePalettes.warning)}
        `,

        danger: css`
          ${secondaryButtonTheme(statePalettes.danger)}
        `,

        success: css`
          ${secondaryButtonTheme(statePalettes.success)}
        `,
      },
    },

    ghost: {
      base: css`
        background-color: transparent;
        color: ${commonPalette.blue};
        ${commonFocusStyles}

        &:enabled {
          &:hover {
            background-color: ${hex2rgba(commonPalette.darkGray, 0.1)};
          }

          &:active {
            background-color: ${hex2rgba(commonPalette.darkGray, 0.15)};
          }
        }

        &:disabled {
          color: ${commonPalette.gray};
        }

        &.${loadingClassName} {
          background-color: ${hex2rgba(commonPalette.darkGray, 0.1)};
          ${loaderIconTheme(commonPalette.lightGray, commonPalette.blue)}
        }
      `,
    },
  },
};

/**
 * Модификаторы расположения иконки внутри кнопки
 **/
export const iconAlignmentMods: IconAlignmentMods = {
  left: css`
    margin-right: 8px;
  `,
  right: css`
    order: 10;
    margin-left: 8px;
  `,
};

/**
 * Модификаторы, отвечающие за стиль лоадера (global | local)
 **/
export const loadingStyleMods: LoadingStylesMods = {
  global: css`
    && {
      color: transparent;
      user-select: none;
      pointer-events: none;
    }
  `,

  local: css`
    && {
      user-select: none;
      pointer-events: none;
    }
  `,
};

// Component -------------------------------------------------------------------

/**
 * Собственные свойства компонента Button
 */
export interface ButtonOwnProps {
  /**
   * Вариант отображения
   * По умолчанию - 'primary'
   */
  variant?: VariantProp;

  /**
   * Параметр, отвечающий за логическое состояние кнопки
   * По умолчанию - 'default'
   */
  state?: StateProp;

  /**
   * Размер кнопки
   * По умолчанию - 'compact'
   */
  size?: SizeProp;

  /**
   * Иконка рядом с текстом
   */
  icon?: ReactNode;

  /**
   * Расположение иконки
   */
  iconAlignment?: IconAlignments;

  /**
   * Флаг, отвечающий за состояние загрузки
   */
  loading?: boolean;

  /**
   * Управление возможностью взаимодействия с компонентом
   */
  disabled?: boolean;
}

/**
 * Свойства компонента Button
 */
export type ButtonProps = ButtonBaseProps & ButtonOwnProps;

/**
 * Кнопка
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = "primary",
    size = "compact",
    state = "default",
    icon,
    iconAlignment = "left",
    className,
    loading,
    disabled,
    onClick,
    children,
    tabIndex,
    ...rest
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const forkedRef = useForkRef(ref, buttonRef);

  const handleClick = useCallback(
    (event) => {
      onClick && !loading && onClick(event);
    },
    [onClick, loading]
  );

  const isLoading = !disabled && loading;
  const loadingStyle = icon ? "local" : "global";
  const buttonStyles = buttonMods.variant[variant];

  useEffect(() => {
    loading && buttonRef.current && buttonRef.current.blur();
  }, [loading]);

  return (
    <StyledButton
      data-testid={Button.displayName}
      {...rest}
      ref={forkedRef}
      onClick={handleClick}
      disabled={disabled}
      tabIndex={loading ? -1 : tabIndex}
      className={classnames(
        className,
        buttonSizeMods[size],

        buttonStyles.base,
        buttonStyles.state && buttonStyles.state[state],

        !isLoading && buttonIconStyles,
        isLoading && loadingClassName,
        isLoading && loadingStyleMods[loadingStyle]
      )}
    >
      {icon && (
        <IconWrapper className={classnames(iconAlignmentMods[iconAlignment])}>
          {isLoading ? LoaderIcon : icon}
        </IconWrapper>
      )}

      {!icon && isLoading && LoaderIcon}

      {children}
    </StyledButton>
  );
});

//Button.displayName = nameof(Button);

export { Button };
