import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  RefObject,
  forwardRef,
  useRef,
  useState,
} from 'react'

import { Icon } from '@/components/ui/input/icons/Rigth-Left-Icons'
import { SearchIcon } from '@/components/ui/input/icons/iconsPack/search-outline'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './input.module.scss'
export type InputType = 'password' | 'search' | 'text'

export type InputProps<T extends InputType> = {
  clear?: (e: any) => void
  disabled?: boolean
  errorMessage?: string
  label?: string
  placeholder?: string
  type?: T
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps<InputType>>(
  ({ className, clear, errorMessage, label, onChange, placeholder, type, value, ...rest }, ref) => {
    const isTypeSearch = type === 'search'
    const isTypePassword = type === 'password'
    const innerRef = useRef<HTMLInputElement>(null)
    const r = (ref as RefObject<HTMLInputElement>) ?? innerRef

    const [isViewPassword, setIsViewPassword] = useState(false)

    const switchView = () => {
      r?.current?.focus()
      setIsViewPassword(prevState => !prevState)
    }
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
      onChange?.(event)
    }

    const onClearHandler = (e: any) => {
      r?.current?.focus()
      clear?.(e)
    }

    return (
      <>
        {label && (
          <label>
            <Typography
              className={clsx(s.inputLabel, { [s.error]: errorMessage })}
              variant={'body2'}
            >
              {label}
            </Typography>
          </label>
        )}

        <div
          className={clsx(s.inputWrapper, {
            [s.error]: errorMessage,
            [s.isLeft]: isTypeSearch,
            [s.isRight]: isTypePassword || (isTypeSearch && value),
          })}
        >
          <input
            {...rest}
            className={clsx(s.input, { [s.error]: errorMessage }, className)}
            onChange={onChangeHandler}
            placeholder={placeholder}
            ref={r}
            type={isViewPassword && isTypePassword ? 'text' : type}
            value={value}
          />
          <div className={s.leftIcon}>{isTypeSearch && <SearchIcon />}</div>
          <div className={s.rightIcon}>
            <Icon
              clear={onClearHandler}
              isTypePassword={isTypePassword}
              isTypeSearch={isTypeSearch}
              isViewPassword={isViewPassword}
              switchView={switchView}
              value={value}
            />
          </div>
        </div>

        {errorMessage && (
          <Typography className={clsx(s.error, s.errorMessage)} variant={'caption'}>
            {errorMessage}
          </Typography>
        )}
      </>
    )
  }
)
