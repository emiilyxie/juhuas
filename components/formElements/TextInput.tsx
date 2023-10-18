import { useState } from 'react';
import formStyles from '@/components/formElements/Form.module.css'

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
    <div className={formStyles.textInputContainer}>
      <label htmlFor={props.label}>{props.label}</label>
      <input id={props.label} className={formStyles.textInput} type="text" value={value} placeholder={props.placeholder} onChange={handleValueChange} />
    </div>
  );
};

export default TextInput;
