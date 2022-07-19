import cl from "tailwindcss/colors";
import { ColorsKeys } from "./components/Button";

const buttonCommon = `inline-flex justify-center items-center px-2 py-1 sm:px-4 sm:py-2 text-lg font-medium `;

export const btnColors: { [key in ColorsKeys]: string } = {
  primary: cl.sky["600"],
  bgPrimary: cl.sky["100"],
  secondary: cl.gray["500"],
  bgSecondary: cl.slate["300"],
  bgHover: cl.sky["700"],
  disabled: cl.neutral["800"],
};

export const colors = {
  primary: cl.sky["600"],
  bgPrimary: cl.sky["100"],
  secondary: cl.gray["500"],
  bgSecondary: cl.slate["300"],
  bgHover: cl.sky["700"],
  disabled: cl.neutral["800"],
};

export const font = {
  primary: "text-" + colors.primary,
  secondary: "text-" + colors.secondary,
};

export const bg = {
  bg: "bg-" + colors.bgPrimary,
  bgSecondary: "bg-" + colors.bgSecondary,
  bgHover: "bg-" + colors.bgHover,
};

export const theme = {
  button: {
    primary: `
      ${buttonCommon}

      text-white  

      bg-purple-600 
      hover:bg-purple-500 

      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 

      border-0 rounded-xl 
      focus-visible:ring-cyan-800 

      active:ring-2 ring-cyan-800
    `,
    secondary: `
      ${buttonCommon}

      text-blue-900  

      bg-sky-400 
      hover:bg-sky-300

      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 

      border-0 rounded-xl 
      focus-visible:ring-cyan-800 

      active:ring-2 ring-cyan-800
    `,
    ghost: `
      ${buttonCommon}

      text-slate-900  

      bg-slate-100
      hover:bg-slate-400

      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 

      border-0 rounded-xl 
      focus-visible:ring-slate-800 

      active:ring-2 ring-slate-800

      shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]
      active:outline outline-offset-0 active:outline-slate-500
    `,
    link: `
      ${buttonCommon}

      text-${colors.primary}  

      bg-${colors.bgPrimary} 
      hover:bg-cyan-300 hover:shadow-cyan-400/500 hover:shadow-lg

      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 

      border-0 rounded-xl 
      focus-visible:ring-slate-100 

      active:ring-2 ring-slate-100

    hover:backdrop-cyan-sm rounded-xl px-5 py-2 sm:px-6
  `,
  },
  table: {
    cell:
      "px-1 py-1 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-md font-light sm:font-medium text-left text-gray-400",

    bold:
      "px-1 py-1 sm:px-6 sm:py-4 text-sm font-medium text-left align-start text-gray-400 font-light whitespace-nowrap",
  },
  font: {
    primary: " text-" + colors.primary,
    secondary: " text-" + colors.secondary,
  },
  global: {
    bg: "bg-" + colors.bgPrimary,
    bgSecondary: "bg-" + colors.bgSecondary,
    bgHover: "bg-" + colors.bgHover,
  },
};
