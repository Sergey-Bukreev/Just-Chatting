import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import s from './layout.module.scss'

export type LayoutProps = { children: ReactNode }
export const Layout = () => {
  return (
    <LayoutPrimitive>
      <Outlet />
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        position={'bottom-right'}
        rtl={false}
        theme={'dark'}
      />
    </LayoutPrimitive>
  )
}
export const LayoutPrimitive = ({ children }: LayoutProps) => {
  return (
    <div className={s.layout}>
      <main className={s.main}>{children}</main>
    </div>
  )
}
