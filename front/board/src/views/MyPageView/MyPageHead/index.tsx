import React, { ChangeEvent, useRef, useEffect } from 'react'

import { Avatar, Box, Typography, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useUserStore } from 'src/stores';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { authorizationHeader, FILE_UPLOAD_URL, mutipartHeader, PATCH_PROFILE_URL } from 'src/constants/api';
import { PatchProfileDto } from 'src/apis/request/user';
import ResponseDto from 'src/apis/response';
import { PatchProfileResponseDto } from 'src/apis/response/user';
import { useCookies } from 'react-cookie';

export default function MyPageHead() {

    const imageRef = useRef<HTMLInputElement | null>(null);

    const [ cookies, setCookies ] = useCookies();
    const { user, setUser, resetUser } = useUserStore();
    const navigator = useNavigate();

    const accessToken = cookies.accessToken;

    const onProfileUploadButtonHandler = () => {
        if (!imageRef.current) return;
        imageRef.current.click();
    }

    const onProfileUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const data = new FormData();
        data.append('file', event.target.files[0]);
        axios.post(FILE_UPLOAD_URL, data, mutipartHeader())
            .then((response) => imageUploadResponseHandler(response))
            .catch((error) => imageUploadErrorHandler(error));
    }

    const imageUploadResponseHandler = (response: AxiosResponse<any, any>) => {
        const profile = response.data as string;
        const data: PatchProfileDto = { profile };

        axios.patch(PATCH_PROFILE_URL, data, authorizationHeader(accessToken))
            .then((response) => patchProfileResponseHandler(response))
            .catch((error) => patchProfileErrorHandler(error));
    }

    const imageUploadErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const patchProfileResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<PatchProfileResponseDto>;
        if (!result || !data) {
            alert(message);
            return;
        }
        setUser(data);
    }

    const patchProfileErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const onLogoutHandler = () => {
        setCookies('accessToken', '', { expires: new Date() });
        resetUser();
        navigator('/');
    }

    useEffect(() => {
        if(!accessToken) {
            navigator('/auth');
            return;
        }
    },[]);

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
                <IconButton sx={{ ml: '10px' }} onClick={() => onProfileUploadButtonHandler()}>
                    <EditOutlinedIcon />
                    <input ref={imageRef} hidden type='file' accept='image/*' onChange={(event) => onProfileUploadChangeHandler(event)} />
                </IconButton>
            </Box>
            <Typography sx={{ mt: '10px', fontSize: '16px', fontWeight: 500, color: 'rgba(0, 0, 0, 0.4)' }}>{user?.email}</Typography>
        </Box>
    </Box>
  )
}
