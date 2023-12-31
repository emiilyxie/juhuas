import formStyles from "@/components/formElements/Form.module.css"

export const PrimaryButton = (props: { 
  onSubmit: () => void, 
  label: string,
  valid: boolean
}) => {
  return (
    <button className={`${formStyles.button} ${formStyles.submitButton}`} type="submit" disabled={!props.valid} onClick={props.onSubmit}>
      {props.label}
    </button>
  )
}

export const PrimaryOutlineButton = (props: { 
  onSubmit: () => void, 
  label: string,
  valid: boolean
}) => {
  return (
    <button className={`${formStyles.button} ${formStyles.signInGoogleButton}`} type="submit" disabled={!props.valid} onClick={props.onSubmit}>
      {props.label}
    </button>
  )
}

export const SecondaryButton = (props: { 
  onSubmit: () => void, 
  label: string,
  valid: boolean
}) => {
  return (
    <button className={`${formStyles.button}`} type="submit" disabled={!props.valid} onClick={props.onSubmit}>
      {props.label}
    </button>
  )
}

export const NavButton = (props: { 
  onSubmit: () => void, 
  label: string,
  valid: boolean
}) => {
  return (
    <button type="submit" disabled={!props.valid} onClick={props.onSubmit}>
      {props.label}
    </button>
  )
}

export const SignInGoogleButton = (props: { 
  onSubmit: () => void, 
  label: string,
  valid: boolean
}) => {
  return (
    <button className={`${formStyles.button} ${formStyles.signInGoogleButton}`} type="submit" disabled={!props.valid} onClick={props.onSubmit}>
      {props.label}
    </button>
  )
}