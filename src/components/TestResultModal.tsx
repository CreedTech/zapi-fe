import React, { MouseEvent } from 'react'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { makeStyles, styled } from '@mui/styles'

import { RunTestResponse } from '../interfaces'

const TestResultModal:React.FC<RunTestResponse> = ({data, message, onClose, status, success}) => {
    const classes = useStyles()

  return (
    <Box className={classes.backdrop} onClick={() => onClose()}>
        <Card className={classes.modal} onClick={(e: MouseEvent<HTMLElement>) => e.stopPropagation()}>
            <Box className={classes.header} style={{background: success ? "#49B443" : "#E64F36"}}>
                <Typography sx={{fontWeight: 500,fontSize: "20px",color: "#FFF"}}>
                    {message}
                </Typography>
            </Box>
            <Stack width="100%" direction="column" mt={2} spacing={1} my={4} px={2}>
                <Typography sx={{fontWeight: 500,color: "var(--color-primary)"}}>
                    Status: {status}
                </Typography>
                <Typography sx={{fontWeight: 500,color: "var(--color-primary)"}}>
                    Success: {success ? 'True' : 'False'}
                </Typography>
                <Typography sx={{fontWeight: 500,color: "var(--color-primary)"}}>
                    Data: {data}
                </Typography>
                <Button onClick={() => onClose()} className={classes.button}>Close</Button>
            </Stack>
        </Card>
    </Box>
  )
}

const useStyles = makeStyles({
    backdrop: {
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: "100000 !important",
    },
    modal: {
        width: "600px",
        "@media screen and (max-width: 900px)": {
            width: "90%",
        }
    },
    header: {
        width: "100%",
        padding: "1rem 1.5rem",
    },
    button: {
        "&.MuiButtonBase-root": {
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            background: "#081F4A",
            color: "#FFF",
            padding: "3px 12px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
            fontSize: "12px",
            fontWeight: 500,
            textTransform: "uppercase",
            fontFamily: "var(--body-font)",
            cursor: "pointer",
            margin: "2rem 0 0",
            "&:hover": {
                background: "#081F4A",
            },
            "&:disabled": {
              background: "#E0E0E0",
              color: "#484848",
            },
        }
    },
})

export default TestResultModal