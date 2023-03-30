import { useEffect, useState } from 'react'

import { Box, Divider, Fab, IconButton, Input } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CreateIcon from '@mui/icons-material/Create';
import { NavigationType, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from 'src/apis/response';
import { PostBoardResponseDto } from 'src/apis/response/board';
import { useCookies } from 'react-cookie';
import { PostBoardDto } from 'src/apis/request/board';
import { authorizationHeader, POST_BOARD_URL } from 'src/constants/api';

export default function BoardWriteView() {

  const [cookies] = useCookies();
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [boardContent, setBoardContent] = useState<string>('');
  const [boardImgUrl, setBoardImgUrl] = useState<string>('');

  const navigator = useNavigate();

  const accessToken = cookies.accessToken;

  const postBoard = () => {
    const data: PostBoardDto = { boardTitle, boardContent, boardImgUrl };
    axios.post(POST_BOARD_URL, data, authorizationHeader(accessToken))
        .then((response) => postBoardResponseHandler(response))
        .catch((error) => postBoardErrorHandler(error));
  }

  const postBoardResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PostBoardResponseDto>
    if (!result || !data) {
      alert(message);
      return;
    }
    navigator('/myPage');
  }

  const postBoardErrorHandler = (error: any) => {
    console.log(error.message);
  }

  const onWriteHandler = () => {
    //? 제목 및 내용 검증 (값이 존재하는지)
    if (!boardTitle.trim() || !boardContent.trim()) {
      alert('모든 내용을 입력해주세요.');
      return;
    }
    postBoard();
  }

  useEffect(() => {
    if(!accessToken){
      alert('로그인이 필요한 작업입니다.');
      navigator('/auth');
    }
  },[]);


  return (
    <Box sx={{ p: '0px 198px', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      <Box sx={{ p: '100px 24px', backgroundColor: '#ffffff' }}>
        <Input fullWidth disableUnderline placeholder='제목을 입력하세요.' sx={{ fontSize: '32px', fontWeight: 500 }} onChange={(event) => setBoardTitle(event.target.value)} />
        <Divider sx={{ m: '40px 0px' }} />
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Input fullWidth disableUnderline multiline minRows={20} placeholder='본문을 작성해주세요.' sx={{ fontSize: '18px', fontWeight: 500, lineHeight: '150%' }} onChange={(event) => setBoardContent(event.target.value)}/>
          <IconButton>
            <ImageOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <Fab sx={{ position: 'fixed', bottom: '200px', right: '248px', backgroundColor: 'rgba(0, 0, 0, 0.4)' }} onClick={onWriteHandler}>
        <CreateIcon />
      </Fab>
    </Box>
  )
}
