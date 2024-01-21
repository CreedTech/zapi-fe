import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { FiAlertCircle } from 'react-icons/fi'
import ZapiHomeLogo from "../assets/images/ZapiHomeLogo.png";


interface IErrorType { error?: any }

const ErrorPage:React.FC<IErrorType> = ({error}) => {
    const classes = useStyles()

  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <div className={classes.zapiContainer}><img src={ZapiHomeLogo} alt="zapi-Home" /><span className={classes.zapi}>Z-API</span></div>
            <h3 className={classes.textError}>Error 404</h3>
            <p className={classes.paragraph}>The page you requested was not found.</p>
        </div>
        <Link to='/'>&larr; Go back to Homepage</Link>
    </div>
  )
}

const useStyles = makeStyles({
    container: {
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        padding: "0 2rem",
        "& p": {
            fontSize: "2rem",
        }
    },
    icon: {
        fontSize: "12rem",
        color: "red",
    },
    textError: {
        color: "#333",
        fontSize: "35px"
    },
    zapiContainer:{
        display: "flex",
        alignItems: "center",
    },
    zapi: {
        color: "#081F4A",
        fontWeight: 700,
        fontSize: "1.75rem"
    },
    paragraph: {
        color: "#081F4A"
    }
})

export default ErrorPage