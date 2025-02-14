import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const Body = () => {
  const { user } = useSelector(store => store.app);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className='flex'>
        {isSidebarOpen && <Sidebar />}
        <Outlet />
      </div>
    </>
  );
};

export default Body;
