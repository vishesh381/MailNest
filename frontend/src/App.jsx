import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Inbox from './components/Inbox'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import Mail from './components/Mail'
import SendEmail from './components/SendEmail'
import Login from './components/Login'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />
      },
      {
        path: "/mail/:id",
        element: <Mail />
      },
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
])

function App() {
  const { theme } = useSelector(store => store.app); // Access theme from Redux store

  useEffect(() => {
    // Apply theme based on Redux state
    document.body.className = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black';
  }, [theme]);

  return (
    <div className='h-screen'>
      <RouterProvider router={appRouter} />
      <div className='absolute w-[30%] bottom-0 right-20 z-10'>
        <SendEmail />
      </div>
      <Toaster />
    </div>
  )
}

export default App
