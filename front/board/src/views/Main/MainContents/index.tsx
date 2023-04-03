import { useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios';
import { Box, Grid, Pagination, Typography, Stack } from '@mui/material'

import BoardListItem from 'src/components/BoardListItem'
import PopularCard from 'src/components/PopularCard'
import { getPageCount } from 'src/utils';
import { usePagingHook } from 'src/hooks';
import ResponseDto from 'src/apis/response';
import { GetListResponseDto, GetTop15SearchWordResponseDto } from 'src/apis/response/board';
import { GET_LIST_URL, GET_TOP15_SEARCH_WORD_URL } from 'src/constants/api';

export default function MainContents() {

  //          Hook          //
  const { viewList, pageNumber, boardList, setBoardList, onPageHandler, COUNT } = usePagingHook(5);
  const [popularList, setPopularList] = useState<string[]>([]);

  //          Event Handler          //
  const getList = () => {
    axios.get(GET_LIST_URL)
    .then((response) => getListResponseHandler(response))
    .catch((error) => getListErrorHandler(error));
  }

  const getTop15SearchWord = () => {
    axios.get(GET_TOP15_SEARCH_WORD_URL)
        .then((response) => getTop15SearchWordResponseHandler(response))
        .catch((error) => getTop15SearchWordErrorHandler(error));
  }

  //           Response Handler           //
  const getListResponseHandler = (response: AxiosResponse<any, any>) => {
    const {result, message, data} = response.data as ResponseDto<GetListResponseDto[]>;
    if (!result || data === null) return;
    setBoardList(data);
  }

  const getTop15SearchWordResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetTop15SearchWordResponseDto>
    if (!result || !data) return;
    setPopularList(data.top15SearchWordList);
  }
  //          Error Handler          //
  const getListErrorHandler = (error: any) => {
    console.log(error.message);
  }

  const getTop15SearchWordErrorHandler = (error: any) => {
    console.log(error.message);
  }

  //          Use Effect         //
  useEffect(() => {
    getList();
    getTop15SearchWord();
  }, [])

  return (
    <Box sx={{ p: '40px 120px', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      <Box>
        <Typography sx={{ fontSize: '24px', fontWeight: 500 }}>최신 게시물</Typography>
      </Box>
      <Box sx={{ pt: '20px', pb: '80px' }}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={8}>
            <Stack spacing={2}>
              {viewList.map((boardItem) => (<BoardListItem item={boardItem as GetListResponseDto} />))}
            </Stack>
          </Grid>
          <Grid item sm={12} md={4}>
            <PopularCard title="인기 검색어" popularList={popularList}/>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination page={pageNumber} count={getPageCount(boardList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
      </Box>
    </Box>
  )
}
