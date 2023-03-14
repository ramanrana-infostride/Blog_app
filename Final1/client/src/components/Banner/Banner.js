import React from 'react'

import { Box,Typography,styled } from '@mui/material'

const Image = styled(Box)`
background : url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
height:50vh;
width:100%; 
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`

const Heading = styled(Typography)`
    font-size:70px;
    color:#ffffff;
    line-height:1;

`
const SubHeading = styled(Typography)`
font-size:20px;
background-color:#ffffff

`

const Banner = () => {
  return (
    <Image>
        <Heading>Blog</Heading>
        <SubHeading>Share Your Knowledge</SubHeading>
    </Image>
  )
}

export default Banner