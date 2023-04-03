import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios, { AxiosResponse } from 'axios';
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material'

import PopularCard from 'src/components/PopularCard'
import BoardListItem from 'src/components/BoardListItem';
import { getPageCount } from 'src/utils';
import { usePagingHook } from 'src/hooks';
import ResponseDto from 'src/apis/response';
import { GetSearchListResponseDto, GetTop15RelatedSearchWordResponseDto } from 'src/apis/response/board';
import { GET_SEARCH_LIST_URL, GET_TOP15_RELATED_SEARCH_WORD_URL } from 'src/constants/api';

export default function SearchView() {

    //          Hook          //
    const { content } = useParams();
    const { viewList, pageNumber, boardList, setBoardList, onPageHandler, COUNT } = usePagingHook(5);

    const [popularList, setPopularList] = useState<string[]>([]);

    //          Event Handler          //
   const getSearchList = () => {
    axios.get(GET_SEARCH_LIST_URL(content as string))
        .then((response) => getSearchListResponseHandler(response))
        .catch((error) => getSearchListErrorHandler(error));
   }

   const getTop15RelatedSearchWord = () => {
    axios.get(GET_TOP15_RELATED_SEARCH_WORD_URL(content as string))
        .then((response) => getTop15RelatedSearchWordResponseHandler(response))
        .catch((error) => getTop15RelatedSearchWordErrorHandler(error));
   }

   //           Response Handler           //
   const getSearchListResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetSearchListResponseDto[]>;
        if (!result || data == null) return;
        setBoardList(data);
   }

   const getTop15RelatedSearchWordResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetTop15RelatedSearchWordResponseDto>;
    if (!result || !data) return;
    setPopularList(data.top15SearchWordList);
   }
   //          Error Handler          //
   const getSearchListErrorHandler = (error: any) => {
    console.log(error.message);
   }

   const getTop15RelatedSearchWordErrorHandler = (error: any) => {
    console.log(error.message);
   }

   //          Use Effect         //
    useEffect(() => {
        //# array.filter(요소 => 조건)
        //? 특정한 조건에 부합하는 요소만 모아서 새로운 배열로 만들어 반환하는 메서드
        //# string.inclues(검색할 문자열)
        //? 해당 문자열에서 검색할 문자열이 존재한다면 true, 아니면 false를 반환하는 메서드
        //const tmp = BOARD_LIST.filter((board) => board.boardTitle.includes(content as string));
        getSearchList();
        getTop15RelatedSearchWord();
    }, [content]);

  return (
    <Box sx={{ p: '40px 120px', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <Box sx={{ fontSize: '24px', fontWeight: 500 }}>
            <Box component='strong'>{content}</Box>
            <Typography component='span' sx={{ fontSize: '24px', fontWeight: 500, opacity: 0.7 }}>에 대한 검색결과 입니다. </Typography>
            <Box component='strong'>{boardList.length}</Box>
        </Box>
        <Box sx={{ pt: '20px', pb: '80px' }}>
            <Grid container spacing={3}>
                <Grid item sm={12} md={8}>
                    <Stack spacing={2}>
                        {viewList.length === 0 ? (<Box sx={{ height: '416px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography sx={{ fontSize: '24px', fontWeight: 500, color: 'rgba(0, 0, 0, 0.4)' }}>검색결과가 없습니다.</Typography></Box>) : viewList.map((boardItem) => (<BoardListItem item={boardItem as GetSearchListResponseDto} />))}
                    </Stack>
                </Grid>
                <Grid item sm={12} md={4}>
                    <PopularCard title='연관 검색어' popularList={popularList}/>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination page={pageNumber} count={getPageCount(boardList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
        </Box>
    </Box>
  )
}
