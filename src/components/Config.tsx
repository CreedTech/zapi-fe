import React from 'react'
import { makeStyles } from "@mui/styles"
import { Typography } from "@mui/material"
import TextField from '@mui/material/TextField';

const Config:React.FC = () => {
    const classes = useStyles();

  return (
    <div className={classes.config}>
        <div className={classes.text}>
            <Typography variant='h6' style={{ fontWeight:600, color:'black',fontSize:'16px',display:'block',
            boxSizing:'border-box',outline:'none 0px',letterSpacing:'normal',
            lineHeight:'24px' }}>
            Request Configurations
            </Typography>
        </div>
        <div className={classes.subconfig}>
            <div className={classes.small}>
                <Typography variant='h6' style={{ fontWeight:600, color:'black',fontSize:'14px',display:'block',
                boxSizing:'border-box',outline:'none 0px',letterSpacing:'normal',
                lineHeight:'20px' }}>
                Request Size Limit
                </Typography>
                <Typography variant='h6' style={{ marginTop:'4px', color:'black',fontSize:'16px',display:'block',
                boxSizing:'border-box',outline:'none 0px',letterSpacing:'normal',
                lineHeight:'16px' }}>
                Configure the request message size
                </Typography>

            </div>
            <div className={classes.mb}>
                    <TextField
                        className={classes.min}
                        id="standard-number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        label="MB"
                    />
                <div className={classes.max}>
                    <div className={classes.submax}>
                        <span style={{ color:'rgba(0, 0, 0, 0.38)',fontSize:'12px',display:'block',
                        boxSizing:'border-box',outline:'none 0px',letterSpacing:'normal',
                        lineHeight:'16px' }}>Max value is 50 MB</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={classes.subconfig}>
            <div className={classes.small}>
                <Typography variant='h6' style={{ fontWeight:800, color:'black',fontSize:'14px',display:'block',
                boxSizing:'border-box',outline:'none 0px',letterSpacing:'normal',
                lineHeight:'20px' }}>
                Proxy Timeout Setting
                </Typography>
                <Typography variant='h6' style={{ marginTop:'4px', color:'black',fontSize:'12px',display:'block',
                boxSizing:'border-box',outline:'none 0px',letterSpacing:'normal',
                lineHeight:'16px' }}>
                Configure the timeout between the proxy and the target endpoints
                </Typography>

            </div>
            <div className={classes.mb}>
                    <TextField
                        className={classes.min}
                        id="standard-number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        label="Sec"
                    />
                <div className={classes.max}>
                    <div className={classes.submax}>
                        <span style={{ color:'rgba(0, 0, 0, 0.38)',fontSize:'12px',display:'block',
                        boxSizing:'border-box',outline:'none 0px',letterSpacing:'normal',
                        lineHeight:'16px' }}>Max value is 180 Sec</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
const useStyles = makeStyles({
    config:{
        marginTop: '32px',
        boxSizing: 'border-box',
    },
    text:{
        flexDirection: 'column',
        boxSizing: 'border-box',
        display: 'flex',
    },
    subconfig:{
        marginTop: '16px',
        padding: '16px',
        flexDirection: 'row',
        webkitBoxPack: 'justify',
        justifyContent: 'space-between',
        borderColor: 'rgb(214, 217, 219)',
        borderRadius: '6px',
        borderStyle: 'solid',
        borderWidth: '1px',
        boxSizing: 'border-box',
        display: 'flex',

    },
    small:{
        flexDirection: 'column',
        boxSizing:'border-box',
        display: 'flex',
    },
    mb:{
        verticalAlign: 'top',
        width: '128px',
        boxSizing: 'border-box',
        cursor: 'inherit'
    },
    min:{


        "& .MuiInputBase-root, &.MuiInputBase-root":{
            display: 'flex',
            borderRadius: '6px',
            paddingLeft: '12px',
            paddingRight: '12px',
            backgroundColor: 'rgb(255, 255, 255)',
            maxWidth: 'inherit',      
            boxSizing: 'border-box',
            webkitBoxAlign: 'center',
            alignItems: 'center',
            backgroundClip: 'padding-box',
            border: 'none',
            cursor: 'text',
            overflow: 'hidden',
            outline: 'none 0px',
            position: 'relative',
        },
        "&.MuiFormLabel-root, &.MuiInputLabel-roo":{
            color: 'rgba(0, 0, 0, 0.38)',
            fontSize: '14px',
            letterSpacing: 'normal',
            lineHeight: '20px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, Helvetica, sans-serif',
            display: 'block',
            boxSizing: 'border-box',
            outline: 'none 0px', 
        }
    },
    max:{
        marginTop: '4px',
        alignItems: 'flex-start',
        webkitBoxPack: 'justify',
        justifyContent:'space-between',
        boxSizing: 'border-box', 
        display: 'flex',
   },
   submax:{
    minWidth: 'auto',
    boxSizing: 'border-box',
   }
})
export default Config