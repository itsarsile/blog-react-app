import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './globals.css'
import Root from './routes/root.tsx'
import ErrorPage from './error-page.tsx'
import Dashboard from './routes/dashboard'
import Home from './routes/home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate to="/home" replace/>}/>
      <Route path='home' element={<Home />} />
      <Route path='dashboard' element={<Dashboard />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
