import React from 'react'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import ScienceOutlinedIcon from '@mui/icons-material/Science'; 
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const ApiSidebar:React.FC = () => {
    const classes = useStyles();

  return (
    <>
      <Link to={'/'} className={classes.side}>
        <div className={classes.wrap}>
          <div className={classes.box}>
            <ControlCameraIcon sx={{display: 'block' }}/>
          </div>
          Requests
        </div>
      </Link>
      <Link to={'/'} className={classes.side}>
        <div className={classes.wrap}>
          <div className={classes.box}>
            <ScienceOutlinedIcon sx={{display: 'block' }}/>
          </div>
          Tests
        </div>
      </Link>
      <Link to={'/'} className={classes.side}>
        <div className={classes.wrap}>
          <div className={classes.box}>
            <LanguageOutlinedIcon sx={{display: 'block' }}/>
          </div>
          Hub Listing
        </div>
      </Link>
      {/* <Link to={'/'} className={classes.side}>
        <div className={classes.wrap}>
          <div className={classes.box}>
            <EditOutlinedIcon sx={{display: 'block' }}/>
          </div>
          Settings
        </div>
      </Link> */}
      <span className={classes.span}></span>
    </>
  )
}

const useStyles = makeStyles({
    side:{
      margin: '0px 0px 8px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, Helvetica, sans-serif',
      fontSize: '14px',
      letterSpacing: 'normal',
      webkitBoxAlign: 'center',
      alignItems: 'center',
      appearance: 'none',
      borderRadius: '6px',
      boxSizing:'border-box',
      colorScheme: 'light',
      cursor: 'pointer',
      display: 'inline-flex',
      fontWeight: 'normal',
      outline: 'none 0px',
      position: 'relative',
      lineHeight: '20px',
      transition: 'color 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s, background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s',
      userSelect: 'none',
      verticalAlign: 'middle',
      height: 'auto',
      backgroundColor:' rgb(255, 255, 255)',
      border: 'none',
      color: 'rgba(73, 69, 69, 0.6)',
      textDecoration: 'none',
      webkitBoxPack: 'start',
      justifyContent: 'flex-start',
      padding:' 8px 14px',
    },

    wrap :{
      boxSizing: 'border-box',
      webkitBoxAlign: 'center',
      alignItems: 'center',
      display: 'flex',
      webkitBoxPack: 'center',
      justifyContent: 'center',
      position: 'relative',
      whiteSpace: 'nowrap',
    },

    box :{
      marginRight: '6px',
      boxSizing: 'border-box',
      color: 'rgba(73, 69, 69, 0.6)'
    },

    span:{
      marginTop: 'auto' 
    }
})

export default ApiSidebar
