//
// Libraries
//
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useState } from 'react'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Pages
//
import Control from '../pages/Control'
//
//  Common Components
//
import Layout from '../components/Layout/Layout'
//
//  Global Themes used by the Theme Provider
//
const theme = createTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126'
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526'
    },
    background: {
      default: '#f4f5fd'
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})
//
//  Client
//
const { CLIENT_REMOTE } = require('../services/constants.js')
const { CLIENT_LOCAL } = require('../services/constants.js')
//
//  Server
//
const { SERVER_REMOTE } = require('../services/constants.js')
const { SERVER_LOCAL_REMOTE } = require('../services/constants.js')
const { SERVER_LOCAL } = require('../services/constants.js')
//
//  Database
//
const { DATABASE_REMOTE } = require('../services/constants.js')
const { DATABASE_LOCAL } = require('../services/constants.js')
//
//  URL
//
const { URL_REMOTE } = require('../services/constants.js')
const { URL_LOCAL_REMOTE } = require('../services/constants.js')
const { URL_LOCAL } = require('../services/constants.js')
//
// Debug Settings
//
const debugLog = debugSettings()
//
// Global
//
let g_firstTimeFlag = true
//----------------------------------------------------------------------------
//- Main Line
//----------------------------------------------------------------------------
export default function App() {
  if (debugLog) console.log(`Start APP`)
  const [currentPage, setCurrentPage] = useState('QuestionList')

  //.............................................................................
  //.  Handle Page Change
  //.............................................................................
  const handlePage = nextPage => {
    //
    //  If no change of Page, return
    //
    if (nextPage === currentPage) return
    //
    //  Change of Page
    //
    const CurrentPage = currentPage
    if (debugLog) console.log(`Current Page ${CurrentPage} ==> New Page ${nextPage}`)
    //
    //  Update Previous Page
    //
    sessionStorage.setItem('Settings_Page_Previous', JSON.stringify(CurrentPage))
    if (debugLog)
      console.log(
        `UPDATED PREVIOUS_Page ${JSON.parse(sessionStorage.getItem('Settings_Page_Previous'))}`
      )
    //
    //  Update NEW Page
    //
    sessionStorage.setItem('Settings_Page_Current', JSON.stringify(nextPage))
    if (debugLog)
      console.log(
        `UPDATED CURRENT_PAGE ${JSON.parse(sessionStorage.getItem('Settings_Page_Current'))}`
      )
    //
    //  Update State
    //
    setCurrentPage(nextPage)
  }
  //.............................................................................
  //  First Time Setup
  //.............................................................................
  const firstTime = () => {
    if (debugLog) console.log(`First Time APP Reset`)
    //
    //  Update URL and Server Name
    //
    let w_Client = CLIENT_REMOTE
    let w_Database = DATABASE_REMOTE
    let w_Server
    let w_URL
    let port = '9002'
    const windowport = window.location.port
    if (windowport) port = windowport
    if (debugLog) console.log(`port(${port})`)
    //
    //  Update store with URL and Server Name - REMOTE
    //
    if (port === '9002') {
      w_Client = CLIENT_LOCAL
      w_Server = SERVER_REMOTE
      w_URL = URL_REMOTE
    }
    //
    //  Update store with URL and Server Name - LOCAL-->REMOTE
    //
    if (port === '9012') {
      w_Client = CLIENT_LOCAL
      w_Server = SERVER_LOCAL_REMOTE
      w_URL = URL_LOCAL_REMOTE
    }
    //
    //  Update store with URL and Server Name - LOCAL
    //
    if (port === '8002') {
      w_Client = CLIENT_LOCAL
      w_Server = SERVER_LOCAL
      w_Database = DATABASE_LOCAL
      w_URL = URL_LOCAL
    }
    //
    //  Store Client, Server, URL
    //
    sessionStorage.setItem('Settings_Client', JSON.stringify(w_Client))
    sessionStorage.setItem('Settings_Server', JSON.stringify(w_Server))
    sessionStorage.setItem('Settings_Database', JSON.stringify(w_Database))
    sessionStorage.setItem('Settings_URL', JSON.stringify(w_URL))
    if (debugLog)
      console.log(
        `QuizClient-PORT(${port}) CLIENT(${w_Client}) SERVER(${w_Server}) DATABASE(${w_Database}) URL(${w_URL})`
      )
    //
    //  Session Storage
    //
    sessionStorage.setItem('Settings_Page_Previous', JSON.stringify(''))
    let Settings_DevMode
    w_Client === CLIENT_REMOTE ? (Settings_DevMode = false) : (Settings_DevMode = true)
    sessionStorage.setItem('Settings_DevMode', Settings_DevMode)
  }
  //.............................................................................
  //
  //  First Time Setup
  //
  if (g_firstTimeFlag) {
    g_firstTimeFlag = false
    firstTime()
  }
  //.............................................................................
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Layout handlePage={handlePage}>
          <Control />
        </Layout>
        <CssBaseline />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
