import { Stack, Typography } from '@mui/material'
import React from 'react'

const ErrorPage = () => {
  return (
    <Stack height={"100vh"} display={"flex"} alignItems={"center"}  justifyContent={"center"} >
      <Typography>404 Not Found</Typography>
    </Stack>
  )
}

export default ErrorPage