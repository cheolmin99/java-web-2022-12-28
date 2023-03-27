import React from 'react'

import { Box } from '@mui/material';
import MyPageHead from './MyPageHead';
import MyPageContents from './MyPageContents';

export default function MyPageView() {
  return (
    <Box>
        <MyPageHead />
        <MyPageContents />
    </Box>
  )
}
