import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'
import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <>
        <Header />
        <Grid container spacing={2} paddingX={5} marginTop={2}>
          <Grid size={3} >
            <Sidebar />
          </Grid>
          <Grid size={9}>
            <Outlet />
          </Grid>
        </Grid>
    </>
  )
}

export default Layout