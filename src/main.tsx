import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store'
import App from './App'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Work from './pages/work/Work'
import WorkDetails from './pages/workDetails/WorkDetails'
import Contact from './pages/contact/Contact'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/work",
        element: <Work />,
        children: [{
            path: "/work/:id",
            element: <WorkDetails/>,
          }]
      },
      {
        path: "/contact",
        element: <Contact />,
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
