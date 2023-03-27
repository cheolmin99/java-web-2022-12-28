interface ResponseDto {
    boardContent: string;
    boardImgUrl: string;
    boardNumber: number;
    boardTitle: string;
    boardWriteDatetime: string;
    commentCount: number;
    likeCount: number;
    viewCount: number;
    writerNickname: string;
    writerProfileUrl: string;
}

export default ResponseDto;