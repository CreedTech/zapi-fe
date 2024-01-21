import React from 'react'
import { makeStyles } from '@mui/styles'


const ComingSoon:React.FC = () => {
    const classes = useStyles();

    return (
        
        <div className={classes.root}>
            <div className={classes.comingSoonContainer}>
                <h1 className={classes.header}>COMING SOON</h1>
                <p className={classes.paragraph}>Z-API allows you to harness the power of AI on your applications without stress. Use powerful AI APIs developed by genius...</p>
                <a href="/" className={classes.button}>
                    Go to HomePage
                </a>
            </div>

            <div className={classes.imageContainer}>

            </div>
        </div>
        
    )
}


const useStyles = makeStyles({
    root:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '6rem',
        padding: '5rem 8rem 0 8rem',
        fontColor: '#071B85',
        width: '100%',
        height: '100vh',
        "@media screen and (max-width: 1200px)": {
            padding: '5rem 5rem 0 5rem',
        },
        "@media screen and (max-width: 1024px)": {
            gap: '4rem',
            padding: "5rem 2rem 0 2rem"
        },
        "@media screen and (max-width: 900px)": {
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
        },
        "@media screen and (max-width: 700px)": {
            flexDirection: 'column',
            padding: '4rem 4rem 0 4rem',
            height: '590px',
        },
        "@media screen and (max-width: 500px)": {
            flexDirection: 'column',
            padding: '3.5rem 3.5rem 0 3.5rem',
            height: '550px',
        },
        

    },
    comingSoonContainer:{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.3rem',
        "@media screen and (max-width: 900px)": {
            flexDirection: 'column',
            alignItems: 'center',
        },
        "@media screen and (max-width: 700px)": {
            scale: .9
        },
        "@media screen and (max-width: 600px)": {
            scale: .8
        },
        "@media screen and (max-width: 500px)": {
            scale: .7
        },
        "@media screen and (max-width: 400px)": {
            scale: .65
        },
        "@media screen and (max-width: 300px)": {
            scale: .55
        }
    },
    header:{
        fontSize: '72px',
        fontWeight: 'bolder',
        color: '#071B85',
    },
    paragraph:{
        fontSize: '18px',
        color: '#333',
        width:'500px',
    },
    button:{
        outline: 'unset',
        border: 'unset',
        backgroundColor: '#071B85',
        borderRadius: '3px',
        padding: '15px 10px',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        width: '280px',
        "@media screen and (max-width: 900px)": {
            width: '430px'
        }
    },
    imageContainer:{
        // backgroundColor: '#e1e1e1',
        backgroundImage: 'url("../../images/Alien science-pana.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        width: '100%',
        height: '350px',
        "@media screen and (max-width: 900px)": {
            display: 'none',
        }
    },
    
})


export default ComingSoon;
