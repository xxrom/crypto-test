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
    <div className="mr-5 relative rounded-md shadow-sm">
      <input
        type="number"
        name="price"
        id="price"
        value={value}
        onChange={onChange}
        className="p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-2xl sm:text-3xl border-gray-300 rounded-md"
        placeholder="0.00"
      />
    </div>
  );
});
