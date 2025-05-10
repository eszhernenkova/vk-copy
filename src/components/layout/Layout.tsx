import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'
import { Grid } from '@mui/material'



type LayoutProps = {
    children: React.ReactNode
}


const Layout = ({ children }: LayoutProps) => {
  return (
    <>
        <Header />
        <Grid container spacing={2} marginX={5} marginTop={2}>
          <Grid size={2} >
            <Sidebar />
          </Grid>
          <Grid size={10}>
            {children}
          </Grid>
        </Grid>
    </>
  )
}

export default Layout