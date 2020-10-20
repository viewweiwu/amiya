import { AyFormProps, RegisterFieldProps } from './ay-form'

export interface registerField extends RegisterFieldProps {}

declare const AyForm: React.ForwardRefExoticComponent<AyFormProps & React.RefAttributes<HTMLDivElement>>

export default AyForm
