import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styles from "../src/styles/Homepage.module.css"
// import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Homepage from './components/Homepage.jsx'
import Easy from './components/Easy.jsx'
import Medium from './components/Medium.jsx'
import Hard from './components/Hard.jsx'
import "./styles/index.css"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>
  },
  {
    path: "/Easy",
    element: <Easy/>
  },
  {
    path: "Medium",
    element: <Medium/>
  },
  {
    path: "Hard",
    element: <Hard/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
