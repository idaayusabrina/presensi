import { useState } from 'react'
import './App.css'
import router from './router/RouterList';
import { RouterProvider } from 'react-router-dom';
import '@fontsource/poppins';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
