import {memo, useCallback, useEffect, useState} from 'react';

export type InputType = {
  initValue?: string | number;
  value?: string | number;
};
export const Input = memo(({initValue = '', value: propsValue}: InputType) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    if (propsValue) {
      setValue(propsValue);
    }
  }, [propsValue]);

  const onChange = useCallback(e => setValue(e?.target?.value), []);

  return (
    <div className="relative mr-5 rounded-md shadow-sm">
      <input
        type="number"
        name="price"
        id="price"
        value={value}
        onChange={onChange}
        className="block w-full p-1 text-2xl border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-3xl rounded-md"
        placeholder="0.00"
      />
    </div>
  );
});
