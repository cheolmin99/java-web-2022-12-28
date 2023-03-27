import { GetBoardResponseDto } from "src/apis/response/board";
import { Liky } from "src/interfaces";

//? 각종 일반 함수 관리
export const getPageCount = (list: any[], count: number) => 
    Math.floor((list.length - 1) / count) + 1;
