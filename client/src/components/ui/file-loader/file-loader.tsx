import { ChangeEvent, ComponentPropsWithoutRef, ElementType, ReactNode, useRef } from 'react'

import { Button } from '@/components/ui/button'
type IntrinsicElementProps<T> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : any
export type FileLoaderProps<T extends ElementType = 'button'> = {
  accept?: string
  as?: T
  asProps?: IntrinsicElementProps<T>
  children?: ReactNode
  className?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & Omit<ComponentPropsWithoutRef<T>, 'onChange'>
export const FileLoader = <T extends ElementType = 'button'>({
  accept,
  as,
  asProps,
  children,
  onChange,
  ...rest
}: FileLoaderProps<T>) => {
  const Component = as || Button
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef?.current?.click()
  }

  return (
    <Component onClick={handleClick} {...asProps} {...rest}>
      <input
        accept={accept}
        onChange={onChange}
        ref={inputRef}
        style={{ display: 'none' }}
        type={'file'}
      />
      {children}
    </Component>
  )
}
