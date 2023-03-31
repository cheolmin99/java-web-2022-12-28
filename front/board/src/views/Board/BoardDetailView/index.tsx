import { MouseEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { Avatar, Box, Card, Divider, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pagination from '@mui/material/Pagination';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

import CommentListItem from 'src/components/CommentListItem';
import LikeListItem from 'src/components/LikeListItem';
import { usePagingHook } from 'src/hooks';
import { useUserStore } from 'src/stores';
import { Board, Comment, ICommentItem, ILikeUser, IPreviewItem, Liky } from 'src/interfaces';
import { getPageCount } from 'src/utils';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from 'src/apis/response';
import { DeleteBoardResponseDto, GetBoardResponseDto, LikeResponseDto, PostCommentResponseDto } from 'src/apis/response/board';
import { authorizationHeader, DELETE_BOARD_URL, GET_BOARD_URL, LIKE_URL, POST_COMMENT_URL } from 'src/constants/api';
import { useCookies } from 'react-cookie';
import { LikeDto, PostCommentDto } from 'src/apis/request/board';

export default function BoardDetailView() {

    const [cookies] = useCookies();

    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const [menuFlag, setMenuFlag] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const [board, setBoard] = useState<Board | null>(null);

    const [likeStatus, setLikeStatus] = useState<boolean>(false);
    const [openLike, setOpenLike] = useState<boolean>(false);
    const [likeList, setLikeList] = useState<Liky[]>([]);

    const [openComment, setOpenComment] = useState<boolean>(false);
    const [commentContent, setCommnetContent] = useState<string>('');

    const accessToken = cookies.accessToken;
    let isLoad = false;

    const { boardList, setBoardList, viewList, COUNT, pageNumber, onPageHandler } = usePagingHook(3);

    const { boardNumber } = useParams();
    const navigator = useNavigate();

    const { user } = useUserStore();

    const getBoard = () => {
        axios.get(GET_BOARD_URL(boardNumber as string))
            .then((response) => getBoardResponseHandler(response))
            .catch((error) => getBoardErrorHandler(error));
    }

    const getBoardResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetBoardResponseDto>
        if(!result || !data) {
            alert(message);
            navigator('/');
            return;
        }
        setBoardResponse(data);
    }

    const getBoardErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const onMenuClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(event.currentTarget);
        setMenuOpen(true);
    }

    const onMenuCloseHandler = () => {
        setAnchorElement(null);
        setMenuOpen(false);
    }

    const onLikeHandler = () => {
        if (!accessToken)  {
            alert('로그인이 필요합니다.');
            return;
        }
        const data: LikeDto = { boardNumber: parseInt(boardNumber as string) };
        axios.post(LIKE_URL, data, authorizationHeader(accessToken))
            .then((response) => likeResponseHandler(response))
            .catch((error) => likeErrorHandler(error));
    }

    const likeResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<LikeResponseDto>;
        if(!result || !data) {
            alert(message);
            return;
        }
        setBoardResponse(data);
    }

    const likeErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const onPostCommentHandler = () => {
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }
        const data: PostCommentDto = { 
            boardNumber: parseInt(boardNumber as string),
            commentContent 
        }
        axios.post(POST_COMMENT_URL, data, authorizationHeader(accessToken))
            .then((response) => postCommentResponseHandler(response))
            .catch((error) => postCommentErrorHandler(error));
    }

    const postCommentResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<PostCommentResponseDto>;
        if (!result || !data){
            alert(message);
            return;
        }
        setBoardResponse(data);
        setCommnetContent('');
    }

    const postCommentErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const onDeleteHandler = () => {
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }
        if (board?.writerEmail !== user?.email) {
            alert('권한이 없습니다.');
            return;
        }

        axios.delete(DELETE_BOARD_URL(boardNumber as string), authorizationHeader(accessToken))
            .then((response) => deleteBoardResponseHandler(response))
            .catch((error) => deleteBoardErrorHandler(error));
    }

    const deleteBoardResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<DeleteBoardResponseDto>;
        if (!result || !data || !data.resultStatus) {
            alert(message);
            return;
        }
        navigator('/');
    }

    const deleteBoardErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const setBoardResponse = (data: GetBoardResponseDto | LikeResponseDto | PostCommentResponseDto) => {
        const { board, commentList, likeList } = data;
        setBoard(board);
        // 댓글 리스트를 3개까지 보여주는
        setBoardList(commentList);
        setLikeList(likeList);
        const owner = user !== null && board.writerEmail === user?.email;
        setMenuFlag(owner);
    }

    useEffect(() => {
        if (isLoad) return;
        //? boardNumber가 존재하는지 검증
        if (!boardNumber) {
            navigator('/');
            return;
        }
        isLoad = (true);
        getBoard();
    }, []);

    useEffect(() => {
        if (!user) return;
        const like = likeList.find((like) => like.userEmail === user.email);
        setLikeStatus(like !== undefined);
    }, [likeList]);

  return (
    <Box sx={{ p: '100px 222px' }}>
        <Box>
            <Box>
                <Typography sx={{ fontSize: '32px', fontWeight: 500 }}>{board?.boardTitle}</Typography>
                <Box sx={{ mt: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={board?.writerProfileUrl ? board?.writerProfileUrl : ''} sx={{ height: '32px', width: '32px', mr: '8px' }} />
                        <Typography sx={{ mr: '8px', fontSize: '16px', fontWeight: 500 }}>{board?.writerNickname}</Typography>
                        <Divider sx={{ mr: '8px' }} orientation='vertical' variant='middle' flexItem />
                        <Typography sx={{ fontSize: '16px', fontWeight: 400, opacity: 0.4 }}>{board?.boardWriteDatetime}</Typography>
                    </Box>
                    { menuFlag && (
                        <IconButton onClick={(event) => onMenuClickHandler(event)}>
                            <MoreVertIcon />
                        </IconButton>
                    ) }
                    <Menu anchorEl={anchorElement} open={menuOpen} onClose={onMenuCloseHandler}>
                        <MenuItem sx={{ p: '10px 59px', opacity: 0.5 }} onClick={() => navigator(`/board/update/${board?.boardNumber}`)}>수정</MenuItem>
                        <Divider />
                        <MenuItem sx={{ p: '10px 59px', color: '#ff0000', opacity: 0.5 }} onClick={() => onDeleteHandler()}>삭제</MenuItem>
                    </Menu>
                </Box>
            </Box>
            <Divider sx={{ m: '40px 0px' }} />
            <Box>
                <Typography sx={{ fontSize: '18px', fontWeight: 500, opacity: 0.7 }}>{board?.boardContent}</Typography>
                { board?.boardImgUrl && (<Box sx={{ width: '100%', mt: '20px' }} component='img' src={board?.boardImgUrl} />) }
            </Box>
            <Box sx={{ display: 'flex', mt: '20px' }}>
                <Box sx={{ mr: '20px', display: 'flex' }}>
                    { likeStatus ? 
                        (<FavoriteIcon sx={{ height: '24px', width: '24px', mr: '6px', opacity: 0.7, color: '#ff0000' }} onClick={() => onLikeHandler()} />) : 
                        (<FavoriteBorderIcon sx={{ height: '24px', width: '24px', mr: '6px', opacity: 0.7 }} onClick={() => onLikeHandler()} />) 
                    }
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, opacity: 0.7, mr: '6px' }}>좋아요 {board?.likeCount}</Typography>
                    <IconButton sx={{ height: '24px', width: '24px' }} onClick={() => setOpenLike(!openLike)}>
                        { openLike ? 
                            (<KeyboardArrowUpOutlinedIcon />) : 
                            (<KeyboardArrowDownOutlinedIcon />) 
                        }
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <CommentOutlinedIcon sx={{ height: '24px', width: '24px', mr: '6px', opacity: 0.7 }} />
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, opacity: 0.7, mr: '6px' }}>댓글 {board?.commentCount}</Typography>
                    <IconButton sx={{ height: '24px', width: '24px' }} onClick={() => setOpenComment(!openComment)}>
                        { openComment ? 
                            (<KeyboardArrowUpOutlinedIcon />) : 
                            (<KeyboardArrowDownOutlinedIcon />) 
                        }
                    </IconButton>
                </Box>
            </Box>
        </Box>
        { openLike && (
            <Box sx={{ mt: '20px' }}>
                <Card variant='outlined' sx={{ p: '20px' }}>
                    <Typography>좋아요 {board?.likeCount}</Typography>
                    <Box sx={{ m: '20px 0px' }}>
                        { likeList.map((likeUser) => (<LikeListItem likeUser={likeUser} />)) }
                    </Box>
                </Card>
            </Box>
        ) }
        <Box>
        { openComment && (
            <Box>
                <Box sx={{ p: '20px' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>댓글 {boardList.length}</Typography>
                    <Stack sx={{ p: '20px 0px' }} spacing={3.75}>
                        {viewList.map((commentItem) => (<CommentListItem item={commentItem as Comment} />))}
                    </Stack>
                </Box>
                <Divider />
                <Box sx={{ p: '20px 0px', display: 'flex', justifyContent: 'center' }}>
                    <Pagination page={pageNumber} count={getPageCount(boardList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
                </Box>
                <Box>
                    <Card variant='outlined' sx={{ p: '20px' }}>
                        <Input minRows={3} multiline disableUnderline fullWidth value={commentContent} onChange={(event) => setCommnetContent(event.target.value)} />
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button sx={{ p: '4px 23px', backgroundColor: '#000000', fontSize: '14px', fontWeight: 400, color: '#ffffff', borderRadius: '46px' }} onClick={() => onPostCommentHandler()}>댓글달기</Button>
                        </Box>
                    </Card>
                </Box>
            </Box>
        ) }
        </Box>
    </Box>
  )
}
