import './index.css'
import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App';
import ImageView from './Components/ImageView';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Login />} />
    <Route path='/signup' element={<SignUp />} />
    <Route path='/home' element={<App />} />
    <Route path="/uploads/:imageId" element={<ImageView />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
