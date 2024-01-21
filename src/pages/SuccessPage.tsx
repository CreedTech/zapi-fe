import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from "@mui/styles";


const SuccessPage = () => {
    const classes = useStyles()

  return (
    <>
    <section className={classes.container}>
    <Stack
       justifyContent="center"
       alignItems="center" 
       sx={{ width: '100vw', height:'100vh'}}
    >
        <img src='/images/success.png' alt="sucess" className={classes.logo} />
        <Typography variant="h5" sx={{textAlign: 'center'}}>You have Succesfully Verified Your Email</Typography>
        <Typography variant='body1' mt={6}>
            <Link to='/login'>
                &larr; Back to log in.
            </Link>
        </Typography>
    </Stack>
    </section>
    </>
  )
}

export default SuccessPage;

const useStyles = makeStyles({
    container: {
        background: '#fff',
      },
      logo:{
          width: '300px',
          height: '300px'
      }
  });