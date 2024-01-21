import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { makeStyles } from "@mui/styles"

const Transform:React.FC = () => {
    const classes = useStyles();

  return (
      <div className={classes.trans}>
            <div className={classes.transform}>
                <span style={{ fontWeight:600, color:'black',fontSize:'16px',display:'block', 
                boxSizing:'border-box',outline:'none 0px', 
                letterSpacing:'normal',lineHeight:'24px' }}>Transformations</span>
                <span style={{ marginTop:'8px', fontWeight:600, color:'rgba(0, 0, 0, 0.6)',fontSize:'12px',display:'block', 
                boxSizing:'border-box',outline:'none 0px', 
                letterSpacing:'normal',lineHeight:'16px' }}>Transformations can be used to remove, remap or
                add parameters in a request or a response</span>
            </div>
            <div className={classes.wrap}>
                <div className={classes.wrapper}>
                    <div className={classes.error}>
                        <ErrorOutlineIcon />
                    </div>
                    <div className={classes.feature}>
                        <span style={{ marginBottom:'12px', fontWeight:600, color:'rgba(0, 0, 0, 0.87)',fontSize:'14px',display:'block', 
                        boxSizing:'border-box',outline:'none 0px', 
                        letterSpacing:'normal',lineHeight:'20px', textAlign:"center" }}>This feature is not yet available in 
                        this beta version</span>
                        <span style={{ marginBottom:'12px', color:'rgba(0, 0, 0, 0.38)',fontSize:'18px',display:'block', 
                        boxSizing:'border-box',outline:'none 0px', 
                        letterSpacing:'normal',lineHeight:'20px', textAlign:"center" }}>You can use this feature in the previous version</span>
                    </div>
                    <button className={classes.btn}>
                        View in Previous Version
                    </button>
                </div>
            </div>
        </div>
  )
}
const useStyles = makeStyles({
    trans:{
        marginTop: '32px',
        boxSizing: 'border-box',
    },
    transform:{
        flexDirection: 'column',
        boxSizing: 'border-box',
        display: 'flex',
    },
    wrap:{
        marginTop: '16px',
        boxSizing: 'border-box',
    },
    wrapper:{
        padding: '40px',
        flexDirection: 'column',
        borderColor: 'rgb(214, 217, 219)',
        borderRadius: '6px',
        borderStyle: 'solid',
        borderWidth: '1px',
        boxSizing: 'border-box',
        display: 'flex',
        webkitBoxAlign: 'center',
        alignItems: 'center',
        webkitBoxPack: 'center',
        justifyContent: 'center',
        minWidth: 'fit-content',
    },
    error:{
        color: 'rgba(0, 0, 0, 0.6)',
        boxSizing:'border-box',
    },
    feature:{
        marginTop: '12px',
        width: '265px',
        boxSizing: 'border-box'
    },
    btn:{
        margin: '0px',
        padding:'0px 12px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, Helvetica, sans-serif',
        fontSize: '14px',
        letterSpacing: 'normal',
        webkitBoxPack: 'center',
        justifyContent: 'center',
        webkitBoxAlign: 'center',
        alignItems: 'center',
        appearance: 'none',
        borderRadius: '6px',
        borderStyle: 'solid',
        borderWidth: '1px',
        boxSizing: 'border-box',
        colorScheme: 'light',
        cursor: 'pointer',
        display: 'inline-flex',
        fontWeight: 'normal',
        height: '36px',
        outline: 'none 0px',
        position: 'relative',
        lineHeight: '20px',
        transition: 'color 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s, background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s',
        userSelect: 'none',
        verticalAlign: 'middle',
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgb(214, 217, 219)',
        color: 'rgba(0, 0, 0, 0.87)'
    }

})

export default Transform