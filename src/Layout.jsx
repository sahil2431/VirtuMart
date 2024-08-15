import React from 'react'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

import Navbar1 from './components/Navbar/Navbar1'
function Layout() {
  return (
    <>
    <Navbar1/>
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout