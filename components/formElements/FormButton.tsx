const FormButton = (props: { 
  onSubmit: () => void, 
  label: string,
  valid: boolean
}) => {
  return (
    <button type="submit" disabled={!props.valid} onClick={props.onSubmit}>
      {props.label}
    </button>
  );
};

export default FormButton;
