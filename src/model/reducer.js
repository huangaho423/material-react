import { sideBarStatus } from './action'

const systemState = {
  sidebar: {
    drawerOpen: true,
  },
}

const systemReducer = (state = systemState, action) => {
  const stateCopy = JSON.parse(JSON.stringify(state)) // Copy of state
  switch (action.type) {
    case sideBarStatus: {
      stateCopy.sidebar.drawerOpen = action.payload.status
      return stateCopy
    }
    default:
      return stateCopy
  }
}

export { systemReducer }
