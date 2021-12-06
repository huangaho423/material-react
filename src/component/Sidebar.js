import { NavLink, withRouter } from 'react-router-dom'
import { useTheme, styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import BarChartIcon from '@mui/icons-material/BarChart'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import PersonIcon from '@mui/icons-material/Person'
import HistoryIcon from '@mui/icons-material/History'
import WidgetsIcon from '@mui/icons-material/Widgets'
import BookIcon from '@mui/icons-material/Book'
import { useSelector, useDispatch } from 'react-redux'
import { sideBarStatus } from '../model/action'

export const drawerWidth = 240

const sidebarList = [
  { text: 'Chart', icon: <BarChartIcon />, url: '/chart' },
  { text: 'Game', icon: <SportsEsportsIcon />, url: '/game' },
  { text: 'History', icon: <HistoryIcon />, url: '/history' },
  { text: 'Widget', icon: <WidgetsIcon />, url: '/widget' },
  { text: 'Post', icon: <BookIcon />, url: '/post' },
  { text: 'About', icon: <PersonIcon />, url: '/about', divider: true },
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Sidebar = (props) => {
  const theme = useTheme()
  const open = useSelector((state) => state.systemReducer.sidebar.drawerOpen)
  const dispatch = useDispatch()

  // handle sidebar status
  const handleDrawerClose = () => {
    return dispatch({
      type: sideBarStatus,
      payload: { status: false },
    })
  }

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div className="mr-auto">Logo</div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarList.map((item, index) => (
            <li key={index}>
              <Tooltip
                title={item.text}
                placement="right"
                disableHoverListener={open === true}
              >
                <ListItem
                  button
                  component={NavLink}
                  to={item.url}
                  selected={item.url === props.location.pathname}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Tooltip>
              {item.divider ? <Divider /> : ''}
            </li>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default withRouter(Sidebar)
