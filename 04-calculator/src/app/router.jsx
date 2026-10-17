import { createBrowserRouter } from 'react-router'
import { CalculatorPage } from '@/pages/CalculatorPage/CalculatorPage'
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage'

// One entry per route. Add new pages here.
export const router = createBrowserRouter([
  { path: '/', element: <CalculatorPage /> },
  { path: '*', element: <NotFoundPage /> },
])
