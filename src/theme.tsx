const buttonCommon = `inline-flex justify-center items-center px-2 py-1 sm:px-4 sm:py-2 text-lg font-medium `;
const getButtonStyle = ({
  textColor,
  bgColor,
  hoverBg,
  hoverRing,
  custom,
}: any) => `
${buttonCommon}

text-${textColor} bg-${bgColor}

border-0 rounded-xl 
hover:bg-${hoverBg} 
focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 

focus-visible:ring-${hoverRing} 
active:ring-2 ring-${hoverRing}

${custom}
`;

export const theme = {
  button: {
    primary: getButtonStyle({
      textColor: 'white',
      bgColor: 'purple-600',
      hoverBg: 'purple-500',
      hoverRing: 'cyan-800',
    }),
    secondary: getButtonStyle({
      textColor: 'blue-900',
      bgColor: 'sky-400',
      hoverBg: 'sky-300',
      hoverRing: 'cyan-800',
    }),
    ghost: getButtonStyle({
      textColor: 'slate-900',
      bgColor: 'slate-100',
      hoverBg: 'slate-400',
      hoverRing: 'slate-800',
      custom: `
      shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]
      active:outline outline-offset-0 active:outline-slate-500`,
    }),
  },
  table: {
    cell:
      'px-1 py-1 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-md font-light sm:font-medium text-left text-gray-900',

    bold:
      'px-1 py-1 sm:px-6 sm:py-4 text-sm font-medium text-left align-start text-gray-900 font-light whitespace-nowrap',
  },
};
