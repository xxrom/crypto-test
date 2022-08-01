import { useCallback, useEffect, useState } from "react";

export type InputType = {
  initValue?: string | number;
  value?: string | number;
  setValue?: (val: any) => void;
  type?: "number" | "text";
};

export const Input = ({
  initValue = "",
  value: propsValue,
  setValue: propsSetValue = () => {},
  type = "number",
}: InputType) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(propsValue || "");
  }, [propsValue]);

  const onChange = useCallback(
    (e) => {
      /* 
          TODO: val bug with adding '.'
          const val = Number(String(e?.target?.value || '.0').replace(/,/g, '.'));
        */

      const val = e?.target?.value;

      if (propsSetValue) {
        propsSetValue(val);
      } else {
        setValue(val);
      }
    },
    [propsSetValue]
  );

  return (
    <div className="relative mr-5 w-full rounded-md shadow-sm">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="block w-full p-1 ring-1 ring-sky-300 focus:ring-sky-800 focus:border-indigo-500 text-xl sm:text-3xl rounded-md"
        placeholder="0.00"
      />
    </div>
  );
};
