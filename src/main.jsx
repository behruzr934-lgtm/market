import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      }
    ]
  },
  {
    path:  "/login",
    index: true,
    element: <Login />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
