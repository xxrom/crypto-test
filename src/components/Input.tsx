import {memo, useCallback, useEffect, useState} from 'react';

export type InputType = {
  initValue?: string | number;
  value?: string | number;
  setValue?: (val: any) => void;
};
export const Input = memo(
  ({
    initValue = '',
    value: propsValue,
    setValue: propsSetValue = () => {},
  }: InputType) => {
    const [value, setValue] = useState(initValue);

    useEffect(() => {
      setValue(propsValue || '');
    }, [propsValue]);

    const onChange = useCallback(
      e => {
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
      [propsSetValue],
    );

    return (
      <div className="relative mr-5 w-full rounded-md shadow-sm">
        <input
          type="number"
          value={value}
          onChange={onChange}
          className="block w-full p-1 text-2xl border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-3xl rounded-md"
          placeholder="0.00"
        />
      </div>
    );
  },
);
