import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './page.module.scss'

export type PageProps = {
  marginTop?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>
export const Page = (props: PageProps) => {
  const { children, className, marginTop, style, ...rest } = props
  const styles: CSSProperties = { marginTop: marginTop, ...style }

  return (
    <div className={clsx(s.Wrapper, className)} style={styles} {...rest}>
      {children}
    </div>
  )
}
