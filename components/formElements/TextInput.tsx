import { useState } from 'react';

const TextInput = (props: {
  label: string,
  value: string,
  onValueChanged : (value : string) => void,
  placeholder : string 
}) => {

  const [value, setValue] = useState(props.value);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    props.onValueChanged(newValue);
  };

  return (
    <input type="text" value={value} placeholder={props.placeholder} onChange={handleValueChange} />
  );
};

export default TextInput;
