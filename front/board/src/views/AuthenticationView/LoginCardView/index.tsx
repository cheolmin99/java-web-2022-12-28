import { Dispatch, SetStateAction, useState } from 'react'
import { useCookies } from 'react-cookie';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography, FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@mui/material';

import { VisibilityOff, Visibility } from '@mui/icons-material';

import { useUserStore } from 'src/stores';

import { SIGN_IN_URL } from 'src/constants/api';
import { SignInDto } from 'src/apis/request/auth';
import ResponseDto from 'src/apis/response';
import { SignInResponseDto } from 'src/apis/response/auth';

import { getExpires } from 'src/utils';

interface Props {
    setLoginView: Dispatch<SetStateAction<boolean>>
}

export default function LoginCardView({ setLoginView }: Props) {

    //          Hook          //
    const navigator = useNavigate();
    
    const { setUser } = useUserStore();

    const [cookies, setCookie] = useCookies();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
  
//          Event Handler          //
  const onLoginHandler = () => {
    //? email 입력했는지 검증 / password 입력했는지 검증
    if (!email.trim() || !password) {
        alert('모든 값을 입력해주세요.');
        return;
    }
    
    const data: SignInDto = { email, password };

    axios.post(SIGN_IN_URL, data)
    .then((response) => signInResponseHandler(response))
    .catch((error) => signInErrorHandler(error));

    
  }

  //          Response Handler          //
  const signInResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<SignInResponseDto>;
    if (!result || !data) {
        alert('로그인 정보가 잘못되었습니다.');
        return
    }
    
    const { token, expiredTime, ...user } = data;
            //? 로그인 처리
            //? 쿠키에 로그인 데이터 (Token) 보관 
            const expires = getExpires(expiredTime);
            setCookie('accessToken', token, { expires });
            //? 스토어에 유저 데이터 보관
            setUser(user);
            navigator('/');
        
  }

  //          Error Handler          //
  const signInErrorHandler = (error: any) => {
    console.log(error.message);
  }

  return (
    <Box display='flex' sx={{height: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Box>
            <Typography variant='h5' fontWeight='900'>로그인</Typography>
            <TextField sx={{mt: '40px'}} fullWidth label="이메일 주소" variant="standard" onChange={(event) => setEmail(event.target.value)} />
            <FormControl fullWidth variant="standard" sx={{ mt: '40px' }}>
                <InputLabel>비밀번호</InputLabel>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={(event) => setPassword(event.target.value)}
                />
            </FormControl>
        </Box>
        <Box>
            <Button sx={{mb: '20px'}} fullWidth variant="contained" size='large' onClick={onLoginHandler}>로그인</Button>
            <Typography textAlign={'center'}>신규사용자 이신가요? 
                <Typography component='span' fontWeight={900} onClick={() => setLoginView(false)}> 회원가입</Typography>
            </Typography>
        </Box>
    </Box>
  )
}
