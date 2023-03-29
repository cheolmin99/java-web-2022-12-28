import { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { useSignUpStore } from 'src/stores';
import axios, { AxiosResponse } from "axios";
import { SignUpDto } from "src/apis/request/auth";
import { SignUpResponseDto } from "src/apis/response/auth";
import  ResponseDto  from "src/apis/response";
import { SIGN_UP_URL } from "src/constants/api";

function FirstPage() {

  const { email, password, passwordCheck } = useSignUpStore();
  const { setEmail, setPassword, setPasswordCheck } = useSignUpStore();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);

  return (
    <Box>
      <TextField
        sx={{ mt: "40px" }}
        fullWidth
        label="이메일 주소*"
        variant="standard"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <FormControl fullWidth variant="standard" sx={{ mt: "40px" }}>
        <InputLabel>비밀번호*</InputLabel>
        <Input
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormControl>
      <FormControl fullWidth variant="standard" sx={{ mt: "40px" }}>
        <InputLabel>비밀번호 확인*</InputLabel>
        <Input
          type={showPasswordCheck ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPasswordCheck(!showPasswordCheck)}
              >
                {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value={passwordCheck}
          onChange={(event) => setPasswordCheck(event.target.value)}
        />
      </FormControl>
    </Box>
  );
}

function SecondPage() {

  const { nickname, telNumber, address, addressDetail } = useSignUpStore();
  const { setNickname, setTelNumber, setAddress, setAddressDetail } = useSignUpStore();

  return (
    <Box>
      <TextField sx={{mt: '40px'}} fullWidth label="닉네임*" variant="standard" value={nickname} onChange={(event) => setNickname(event.target.value)} />
      <TextField sx={{mt: '40px'}} fullWidth label="휴대폰 번호*" variant="standard" value={telNumber} onChange={(event) => setTelNumber(event.target.value)} />
      <FormControl fullWidth variant="standard" sx={{mt: '40px'}}>
        <InputLabel>주소*</InputLabel>
        <Input type="text" endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <KeyboardArrowRightIcon />
            </IconButton>
          </InputAdornment>
        } 
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        />
      </FormControl>
      <TextField sx={{mt: '40px'}} fullWidth label="상세 주소*" variant="standard" value={addressDetail} onChange={(event) => setAddressDetail(event.target.value)} />
    </Box>
  );
}

interface Props {
  setLoginView: Dispatch<SetStateAction<boolean>>;
}

export default function SignUpCardView({ setLoginView }: Props) {

  const [page, setPage] = useState<number>(1);
  const { email, password, passwordCheck } = useSignUpStore();
  const { nickname, telNumber, address, addressDetail } = useSignUpStore();

  const onNextButtonHandler = () => {
    //? 해당 문자열 변수가 빈값인지 확인
    //? 1. 해당 변수 == '';
    //? 2. 해당 변수의 길이 == 0;
    if (!email || !password || !passwordCheck) {
      alert('모든 값을 입력하세요.');
      return;
    }
    if (password !== passwordCheck) {
      alert('비밀번호가 서로 다릅니다.');
      return;
    }
    setPage(2);
  };

  const onSignUpHandler = () => {
    if (!email || !password || !passwordCheck) {
      alert('모든 값을 입력하세요.');
      setPage(1);
      return;
    }
    if (!nickname || !telNumber || !address || !addressDetail) {
      alert('모든 값을 입력하세요.');
      setPage(2);
      return;
    }
    if (password !== passwordCheck) {
      alert('비밀번호가 서로 다릅니다.');
      setPage(1);
      return;
    }
    
    const data: SignUpDto = { email, password, nickname, telNumber, address: `${address} ${addressDetail}` };

    axios.post(SIGN_UP_URL, data)
    .then((response) => signUpResponseHandler(response))
    .catch((error) => signUpErrorHandler(error));

    // const response = await axios.post("http://localhost:4040/auth/sign-up", data);


  }

  const signUpResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message } = response.data as ResponseDto<SignUpResponseDto>;
    if(result) setLoginView(true);
    else alert(message);
  }

  const signUpErrorHandler = (error: any) => {
    console.log(error.response.status);
  }

  return (
    <Box
      display="flex"
      sx={{
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box display="flex" sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight="900">
            회원가입
          </Typography>
          <Typography variant="h5" fontWeight="900">
            {page}/2
          </Typography>
        </Box>
        {page === 1 ? <FirstPage /> : <SecondPage />}
      </Box>
      <Box>
        {page === 1 && (
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mb: "20px" }}
            onClick={onNextButtonHandler}
          >
            다음 단계
          </Button>
        )}
        {page === 2 && (
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mb: "20px" }}
            onClick={onSignUpHandler}
          >
            회원가입
          </Button>
        )}
        <Typography textAlign="center">
          이미 계정이 있으신가요?
          <Typography
            component="span"
            fontWeight={900}
            onClick={() => setLoginView(true)}
          >
            {" "}
            로그인
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
