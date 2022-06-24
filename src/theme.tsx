const buttonCommon = `inline-flex justify-center items-center px-2 py-1 sm:px-4 sm:py-2 text-lg font-medium `;

const getButtonStyle = ({
  textColor = "white",
  bgColor = "neutral-800",
  hover = "",
  hoverRing = "",
  custom = "",
}: {
  textColor: string;
  bgColor: string;
  hover: string;
  hoverRing: string;
  custom?: string;
  loading?: string; // TODO: loading state
}) => `
${buttonCommon}

text-${textColor}  

bg-${bgColor} 
${hover} 

focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 

border-0 rounded-xl 
focus-visible:ring-${hoverRing} 

active:ring-2 ring-${hoverRing}

${custom}
`;

export const colors = {
  primary: "sky-400",
  secondary: "gray-500",
  bgPrimary: "slate-900",
  bgSecondary: "slate-800",
  bgHover: "slate-700",
  disabled: "neutral-800",
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
    primary: getButtonStyle({
      textColor: "white",
      bgColor: "purple-600",
      hover: "hover:bg-purple-500",
      hoverRing: "cyan-800",
      loading: "text-neutral-400 bg-neutral-400 hover:bg-neutral-300",
    }),
    secondary: getButtonStyle({
      textColor: "blue-900",
      bgColor: "sky-400",
      hover: "hover:bg-sky-300",
      hoverRing: "cyan-800",
      loading: "text-neutral-400 bg-neutral-400 hover:bg-neutral-300",
    }),
    ghost: getButtonStyle({
      textColor: "slate-900",
      bgColor: "slate-100",
      hover: "hover:bg-slate-400",
      hoverRing: "slate-800",
      loading: "text-neutral-400 bg-neutral-400 hover:bg-neutral-300",
      custom: `
      shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]
      active:outline outline-offset-0 active:outline-slate-500
      `,
    }),
    link: getButtonStyle({
      textColor: colors.primary,
      bgColor: colors.bgPrimary,
      hover: `hover:bg-cyan-300 hover:shadow-cyan-400/500 hover:shadow-lg`,
      hoverRing: "slate-100",
      loading: "text-neutral-400 bg-neutral-400 hover:bg-neutral-300",
      custom: `hover:backdrop-cyan-sm rounded-xl px-5 py-2 sm:px-6`,
    }),
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
