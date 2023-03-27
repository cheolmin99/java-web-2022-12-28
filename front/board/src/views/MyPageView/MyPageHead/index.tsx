import React from 'react'

import { Avatar, Box, Typography, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useUserStore } from 'src/stores';
import { useNavigate } from 'react-router-dom';

export default function MyPageHead() {

    const { user, resetUser } = useUserStore();
    const navigator = useNavigate();

    const onLogoutHandler = () => {
        resetUser();
        navigator('/');
    }

  return (
    <Box sx={{ p: '40px 120px', display: 'flex' }}>
        <Box>
            <IconButton onClick={onLogoutHandler}>
                <Avatar sx={{ height: '120px', width: '120px' }} alt={user?.nickname} src={user?.profile ? user.profile: ''} />
            </IconButton>
        </Box>
        <Box sx={{ ml: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: 500, color: 'rgba(0, 0, 0, 0.7)' }}>{user?.nickname}</Typography>
                <IconButton sx={{ ml: '10px' }}>
                    <EditOutlinedIcon />
                </IconButton>
            </Box>
            <Typography sx={{ mt: '10px', fontSize: '16px', fontWeight: 500, color: 'rgba(0, 0, 0, 0.4)' }}>{user?.email}</Typography>
        </Box>
    </Box>
  )
}
