import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import axios, { AxiosResponse } from "axios";
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
  FormHelperText,
  Checkbox,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { useSignUpStore } from 'src/stores';
import { SignUpDto } from "src/apis/request/auth";
import { SignUpResponseDto } from "src/apis/response/auth";
import  ResponseDto  from "src/apis/response";
import { SIGN_UP_URL } from "src/constants/api";

//           Component          //
interface FirstpageProps {
  signUpError: boolean;
}

function FirstPage({ signUpError }: FirstpageProps) {

  //          Hook          //
  const { email, password, passwordCheck } = useSignUpStore();
  const { setEmail, setPassword, setPasswordCheck } = useSignUpStore();

  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckmessage, setPasswordCheckMesaage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);

  const emailValidator = /^[A-Za-z0-9]*@[A-Za-z0-9]([-.]?[A-Za-z0-9])*\.[A-Za-z0-9]{2,3}$/; 
  const passwordValidator = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?_]).{8,20}$/
  
  //          Event Handler          //
  const onEmailChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    const isMatched = emailValidator.test(value);
    if (isMatched) setEmailMessage('');
    else setEmailMessage('이메일 주소 포맷이 맞지 않습니다.');
    setEmail(value);
  }

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    const isMatched = passwordValidator.test(value);
    if (isMatched) setPasswordMessage('');
    else setPasswordMessage('영대문자, 소문자 + 숫자 + 특수문자(!?_)를 포함한 8~20자를 입력해주세요.');
    setPassword(value);
  }

  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    const isMatched = password === value;  
    if (isMatched) setPasswordCheckMesaage('');
    else setPasswordCheckMesaage('비밀번호가 서로 일치하지 않습니다.');
    setPasswordCheck(value);
  }

  return (
    <Box>
      <TextField
        sx={{ mt: "40px" }}
        error={signUpError}
        fullWidth
        label="이메일 주소*"
        variant="standard"
        value={email}
        helperText={emailMessage}
        onChange={(event) => onEmailChangeHandler(event)}
      />
      <FormControl sx={{ mt: "40px" }} error={signUpError} fullWidth variant="standard" >
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
          onChange={(event) => onPasswordChangeHandler(event)}
        />
        <FormHelperText>{passwordMessage}</FormHelperText>
      </FormControl>
      <FormControl sx={{ mt: "40px" }} error={signUpError} fullWidth variant="standard" >
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
          onChange={(event) => onPasswordCheckChangeHandler(event)}
        />
        <FormHelperText>{passwordCheckmessage}</FormHelperText>
      </FormControl>
    </Box>
  );
}

//          Component          //
interface SecondPageProps {
  signUpError: boolean;
}

function SecondPage({ signUpError }: SecondPageProps) {

  //          Hook          //
  const { nickname, telNumber, address, addressDetail } = useSignUpStore();
  const { setNickname, setTelNumber, setAddress, setAddressDetail } = useSignUpStore();

  const [telNumberMessage, setTelNumberMessage] = useState<string>('');

  const telNumberVauldator = /^[0-9]{0,13}$/;
  // const telNumberVaildator = /^[0-9]{3}-[0-9]{3,4}-[0-9]{3,4}$/; 

  //          Event Handler          //
  const onTelNumberHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    const isMatched = telNumberVauldator.test(value);
    if (isMatched) setTelNumberMessage('');
    else setTelNumberMessage('숫자만 입력해주세요.');
    setTelNumber(value);
  }

  return (
    <Box>
      <TextField sx={{mt: '40px'}} error={signUpError} fullWidth label="닉네임*" variant="standard" value={nickname} onChange={(event) => setNickname(event.target.value)} />
      <TextField sx={{mt: '40px'}} error={signUpError} fullWidth label="휴대폰 번호*" variant="standard" value={telNumber} onChange={(event) => onTelNumberHandler(event)} helperText={telNumberMessage}/>
      <FormControl sx={{mt: '40px'}} error={signUpError} fullWidth variant="standard">
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
      <TextField sx={{mt: '40px'}} error={signUpError} fullWidth label="상세 주소*" variant="standard" value={addressDetail} onChange={(event) => setAddressDetail(event.target.value)} />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: '24px' }}>
        <Checkbox color="default"/>
        <Typography sx={{mr: '4px', color: 'red' ,fontWeight: 400}}>개인정보 동의</Typography>
        <Typography sx={{fontWeight: 700}}>더보기&gt;</Typography>
      </Box>
    </Box>
  );
}

interface Props {
  setLoginView: Dispatch<SetStateAction<boolean>>;
}

export default function SignUpCardView({ setLoginView }: Props) {

  //          Hook          //
  const { email, password, passwordCheck } = useSignUpStore();
  const { nickname, telNumber, address, addressDetail } = useSignUpStore();

  const [page, setPage] = useState<number>(1);
  const [signUpError, setSignUpError] = useState<boolean>(false);

  const emailValidator = /^[A-Za-z0-9]*@[A-Za-z0-9]([-.]?[A-Za-z0-9])*\.[A-Za-z0-9]{2,3}$/; 
  const passwordValidator = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?_]).{8,20}$/

  //          Event Handler          //
  const onNextButtonHandler = () => {
    //? 해당 문자열 변수가 빈값인지 확인
    //? 1. 해당 변수 == '';
    //? 2. 해당 변수의 길이 == 0;
    if (!email || !password || !passwordCheck) {
      setSignUpError(true);
      return;
    }
    if (!emailValidator.test(email)) return;
    if (!passwordValidator.test(password)) return;
    if (password !== passwordCheck) return;

    setSignUpError(false);
    setPage(2);
  };

  const onSignUpHandler = () => {
    if (!email || !password || !passwordCheck) {
      setSignUpError(true);
      setPage(1);
      return;
    }
    if (!nickname || !telNumber || !address || !addressDetail) {
      setSignUpError(true);
      setPage(2);
      return;
    }
    if (!emailValidator.test(email)) {
      setPage(1);
      return;
    }
    if (!passwordValidator.test(password)) {
      setPage(1);
      return;
    }
    if (password !== passwordCheck) {

      setPage(1);
      return;
    }
    
    setSignUpError(false);

    const data: SignUpDto = { email, password, nickname, telNumber, address: `${address} ${addressDetail}` };

    axios.post(SIGN_UP_URL, data)
    .then((response) => signUpResponseHandler(response))
    .catch((error) => signUpErrorHandler(error));

    // const response = await axios.post("http://localhost:4040/auth/sign-up", data);
  }

  //           Response Handler           //
  const signUpResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message } = response.data as ResponseDto<SignUpResponseDto>;
    if(result) setLoginView(true);
    else alert(message);
  }

  //          Error Handler          //
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
        {page === 1 ? <FirstPage signUpError={signUpError}/> : <SecondPage signUpError={signUpError}/>}
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
