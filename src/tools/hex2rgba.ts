import { ThemeColor } from "../common/collors";

export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const parseDigits = (str: string) => (str.match(/\d+/g) || []).join("");

/**
 * Конвертирует hex цвета в rgba
 * @param {string} hex - Цвет в hex формате
 * @param {string} alpha - Прозрачность [0, 1]
 */
export const hex2rgba = (
  hex: string | ThemeColor,
  alpha: number = 1
): string => {
  if (!alpha) {
    return "transparent";
  }

  const r = parseInt(String(hex).slice(1, 3), 16);
  const g = parseInt(String(hex).slice(3, 5), 16);
  const b = parseInt(String(hex).slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
