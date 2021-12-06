import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { Navbar } from '../component/Navbar'
import Sidebar, { DrawerHeader } from '../component/Sidebar'
import { Switch, Route } from 'react-router-dom'
import { Home } from './Home'

export const Main = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Box>
    </Box>
  )
}
