import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Layout } from '../components/layout/layout'
import { CheckEmailPage } from '../pages/check-email-page'
import { CheckPasswordPage } from '../pages/check-password'
import { HomePage } from '../pages/home-page'
import { MessagePage } from '../pages/message-page'
import { RegisterPage } from '../pages/register-page'
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
]
const privateRoutes: RouteObject[] = [
  {
    element: <HomePage />,
    path: '/home',
  },
  {
    element: <MessagePage />,
    path: '/home/:userId',
  },
]

function PrivateRoutes() {
  // const { isAuthenticated } = useAuthContext()

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
