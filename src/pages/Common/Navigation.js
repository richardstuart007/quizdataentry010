//
//  Libraries
//
import { Grid } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
//  Icons
//
import PersonIcon from '@mui/icons-material/Person'
import QuizIcon from '@mui/icons-material/Quiz'
import GroupIcon from '@mui/icons-material/Group'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Components
//
import MyActionButton from '../../components/controls/MyActionButton'
//
//  Style overrides
//
const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex'
    }
  }
})
//
// Debug Settings
//
const debugLog = debugSettings()

//===================================================================================
export default function Navigation({ handlePage }) {
  const classes = useStyles()
  //
  //  Define the Store
  //
  const CurrentPage = JSON.parse(sessionStorage.getItem('Settings_Page_Current'))
  if (debugLog) console.log('CurrentPage', CurrentPage)
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        {/* .......................................................................................... */}
        {CurrentPage !== 'OwnerList' ? (
          <MyActionButton
            startIcon={<PersonIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              handlePage('OwnerList')
            }}
          >
            Owners
          </MyActionButton>
        ) : null}

        {/* .......................................................................................... */}
        {CurrentPage !== 'QuestionList' ? (
          <MyActionButton
            startIcon={<QuizIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              handlePage('QuestionList')
            }}
          >
            Questions
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {CurrentPage !== 'Group1List' ? (
          <MyActionButton
            startIcon={<GroupIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              handlePage('Group1List')
            }}
          >
            Group1
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {CurrentPage !== 'Group2List' ? (
          <MyActionButton
            startIcon={<GroupIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              handlePage('Group2List')
            }}
          >
            Group2
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {CurrentPage !== 'Group3List' ? (
          <MyActionButton
            startIcon={<GroupIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              handlePage('Group3List')
            }}
          >
            Group3
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {CurrentPage !== 'ReflinksList' ? (
          <MyActionButton
            startIcon={<QuizIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              handlePage('ReflinksList')
            }}
          >
            Reflinks
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {CurrentPage !== 'WhoList' ? (
          <MyActionButton
            startIcon={<PersonIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              handlePage('WhoList')
            }}
          >
            Who
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
      </Grid>
    </div>
  )
}
