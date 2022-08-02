import { useCallback, useEffect, useState } from "react";

export type InputType = {
  initValue?: string | number;
  value?: string | number;
  placeholder?: string;
  setValue?: (val: any) => void;
  onEnter?: () => void;
  onClear?: () => void;
  type?: "number" | "text";
};

export const Input = ({
  initValue = "",
  value: propsValue,
  placeholder = "",
  setValue: propsSetValue = () => {},
  onEnter = () => {},
  onClear = () => {},
  type = "number",
}: InputType) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(propsValue || "");
  }, [propsValue]);

  const handleClear = useCallback(() => {
    setValue("");
    onClear();
  }, [onClear]);

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

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onEnter && onEnter();
      }
    },
    [onEnter]
  );

  return (
    <div className="relative mr-5 w-full flex flex-row justifiy-center items-center rounded-md shadow-sm">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="block w-full p-1 ring-1 ring-sky-300 focus:ring-sky-800 focus:border-indigo-500 text-xl sm:text-3xl rounded-md"
        placeholder={placeholder}
      />
      <span onClick={handleClear}>[X]</span>
    </div>
  );
};
