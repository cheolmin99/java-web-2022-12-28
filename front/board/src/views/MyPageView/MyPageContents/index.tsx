import { useEffect } from 'react'

import { Box, Card, CardActionArea, Grid, Typography, Pagination, Stack } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

import { usePagingHook } from 'src/hooks';
import { BOARD_LIST } from 'src/mock';
import { useUserStore } from 'src/stores';
import BoardListItem from 'src/components/BoardListItem';
import { getPageCount } from 'src/utils';
import { useNavigate } from 'react-router-dom';
import { IPreviewItem } from 'src/interfaces';
import { useCookies } from 'react-cookie';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from 'src/apis/response';
import { GetMyListResponseDto } from 'src/apis/response/board';
import { authorizationHeader, GET_MY_LIST_URL } from 'src/constants/api';

export default function MyPageContents() {

    const { boardList, viewList, pageNumber, setBoardList, onPageHandler, COUNT } = usePagingHook(5);
    //? 로그인 한 상태일 때 유저 정보를 가져올 수 있도록
    //? 스토어에서 user 상태를 가져옴
    const { user } = useUserStore();
    const [cookies] = useCookies();
    const navigator = useNavigate();

    const getMyList = (accessToken: string) => {
        axios.get(GET_MY_LIST_URL, authorizationHeader(accessToken))
        .then((response) => getMyListResponseHandler(response))
        .catch((error) => getMyListErrorHandler(error))
    }

    const getMyListResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetMyListResponseDto[]>;
        if (!result || data === null) return;
        setBoardList(data);
    }

    const getMyListErrorHandler = (error: any) => {
        console.log(error.message);
    }

    useEffect(() => {
        const accessToken = cookies.accessToken;
        //? 로그인이 되어있지 않으면 로그인 페이지로 이동
        if (!accessToken) {
            alert('로그인이 필요한 작업입니다.');
            navigator('/auth');
        }
        getMyList(accessToken);
    }, []);

  return (
    <Box sx={{ p: '40px 120px', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <Box>
            <Typography sx={{ fontSize: '24px', fontWeight: 500 }}>내 게시물 {boardList.length}</Typography>
        </Box>
        <Box sx={{ mt: '20px', mb: '80px' }}>
            <Grid container spacing={3}>
                <Grid item sm={12} md={8}>
                    <Stack spacing={2}>
                        {viewList.map((boardItem) => (<BoardListItem item={boardItem as GetMyListResponseDto} />))}
                    </Stack>
                </Grid>
                <Grid item sm={12} md={4}>
                    <Card variant='outlined'>
                        <CardActionArea sx={{ p: '25px 0px', display: 'flex', justifyContent: 'center' }} onClick={() => navigator('/board/write')}>
                            <CreateIcon sx={{ mr: '6px' }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>글쓰기</Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination page={pageNumber} count={getPageCount(boardList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
        </Box>
    </Box>
  )
}
