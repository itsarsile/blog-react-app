import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './globals.css'
import Root from './routes/root.tsx'
import ErrorPage from './error-page.tsx'
import Dashboard from './routes/dashboard'
import Home from './routes/home'
import Post from './routes/post/index.tsx'
import PostLayout from './routes/post/PostLayout.tsx'
import { Provider } from 'jotai/react'
import { QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate to="/home" replace />} />
      <Route path='home' element={<Home />} />
      <Route element={<PostLayout />}>
        <Route path='post/:postId' element={<Post />} />
      </Route>
      <Route path='dashboard' element={<Dashboard />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
