import React, { useEffect } from 'react'
import Header from './common/Header'
import Footer from './common/Footer'
import { Outlet } from 'react-router-dom'
import {ClerkProvider} from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}




function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <div> 
          <Header></Header>
            <div style={{minHeight:"123vh"}} className='m-5'>
                <Outlet/>
            </div>
            <Footer></Footer>
        </div>
    </ClerkProvider>
  )
}

export default RootLayout
