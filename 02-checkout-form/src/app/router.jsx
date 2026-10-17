import { createBrowserRouter } from 'react-router'
import { CheckoutPage } from '@/pages/CheckoutPage/CheckoutPage'
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage'

// One entry per route. Add new pages here.
export const router = createBrowserRouter([
  { path: '/', element: <CheckoutPage /> },
  { path: '*', element: <NotFoundPage /> },
])
