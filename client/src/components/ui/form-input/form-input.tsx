import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input, InputProps, InputType } from '@/components/ui/input/input'

export type FormInputProps<T extends FieldValues> = {
  control: any
  name: 'answer' | 'confirmPassword' | 'cover' | 'email' | 'name' | 'password' | 'question'
} & Omit<InputProps<InputType>, 'onChange' | 'value'> &
  UseControllerProps<T>
export function FormInput<T extends FieldValues>({ control, name, ...rest }: FormInputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <Input errorMessage={error?.message} {...rest} {...field} />
}
