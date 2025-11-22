import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import {store} from "./app/store.js"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import  Home  from './components/Home.jsx'


const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>} >
      <Route path='' element={<Home/>} />
    </Route>
  )
)





createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
