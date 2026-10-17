import { createBrowserRouter } from 'react-router'
import { HomePage } from '@/pages/HomePage/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage'
import { TempestPage } from '@/pages/TempestPage/TempestPage'

// One entry per route. Add new pages here.
export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/tempest', element: <TempestPage /> },
  { path: '*', element: <NotFoundPage /> },
])
