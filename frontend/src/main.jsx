import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from "./app/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'

import Login from './components/Login.jsx'

const router= createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/login",
        element:<Login/>
      }
    ]
  }
])





createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
