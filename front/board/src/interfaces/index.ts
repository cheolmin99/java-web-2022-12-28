import Board from './Board.interface';
import Comment from './Comment.interface';
import Liky from './Liky.interface';
import User from './User.interface';

//? 인터페이스 관리
export interface IPreviewItem {
    boardNumber: number;
    img: string | null;
    writerProfile: string;
    writerNickname: string;
    writeDate: string;
    boardTitle: string;
    boardContent: string;
    likeCount: number;
    commentCount: number;
    viewCount: number;
}

export interface IUser {
    email: string;
    password: string;
    nickname: string;
    telNumber: string;
    address: string;
    addressDetail: string;
    profile?: string;
}

export interface ILikeUser {
    likeUserProfile: string;
    likeUserNickname: string;
}

export interface ICommentItem {
    commentUserProfile: string;
    commentUserNickname: string;
    commentContent: string;
    commentDatetime: string;
}

export type { Board, Comment, Liky, User };