interface Dto {
  board: {
    boardContent: string;
    boardImgUrl: string;
    boardNumber: number;
    boardTitle: string;
    boardWriteDatetime: string;
    commentCount: number;
    likeCount: number;
    viewCount: number;
    writerEmail: string;
    writerNickname: string;
    writerProfileUrl: string;
  };
  commentList: [
    {
      boardNumber: number;
      commentContent: string;
      commentNumber: number;
      writeDatetime: string;
      writerEmail: string;
      writerNickname: string;
      writerProfileUrl: string;
    }
  ];
  likeList: [
    {
      boardNumber: number;
      userEmail: string;
      userNickname: string;
      userProfileUrl: string;
    }
  ];
}

export default Dto;
