import formStyles from "@/components/Form.module.css"

export const SubmitButton = (props: { 
  onSubmit: () => void, 
  label: string,
  valid: boolean
}) => {
  return (
    <button className={formStyles.submitButton} type="submit" disabled={!props.valid} onClick={props.onSubmit}>
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
    <button type="submit" disabled={!props.valid} onClick={props.onSubmit}>
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
    <button className={formStyles.signInGoogleButton} type="submit" disabled={!props.valid} onClick={props.onSubmit}>
      {props.label}
    </button>
  )
}