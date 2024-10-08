import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '../components/layout/layout'
import { CheckEmailPage } from '../pages/check-email-page'
import { CheckPasswordPage } from '../pages/check-password'
import { ForgotPasswordPage } from '../pages/forgot-password-page/forgot-password.page'
import { HomePage } from '../pages/home-page'
import { MessagePage } from '../pages/message-page'
import { RegisterPage } from '../pages/register-page'
import { useAuth } from '../utils/auth-context'
const publicRoutes: RouteObject[] = [
  {
    element: <RegisterPage />,
    path: 'register',
  },
  {
    element: <CheckEmailPage />,
    path: 'email',
  },
  {
    element: <CheckPasswordPage />,
    path: 'password',
  },
  {
    element: <ForgotPasswordPage />,
    path: '/forgot-password',
  },
]
const privateRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <MessagePage />,
        path: ':userId',
      },
    ],
    element: <HomePage />,
    path: '/home',
  },
]

function PrivateRoutes() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={'/email'} />
  }

  return <Outlet />
}
export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
