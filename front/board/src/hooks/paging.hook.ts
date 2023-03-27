import { useEffect, useState } from "react";
import { ICommentItem, IPreviewItem } from "src/interfaces";
import { BOARD_LIST } from "src/mock";

const usePagingHook = (COUNT: number) => {

  const [boardList, setBoardList] = useState<(IPreviewItem | ICommentItem)[]>([]);
  const [viewList, setViewList] = useState<(IPreviewItem | ICommentItem)[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  //? 한 페이지에 5개의 게시물을 보여주고자 할 때
  //? 배열의 시작 인덱스    5 * pageNumber - 5 -> 5 * (pageNumber - 1)
  //? 배열의 마지막 인덱스  5 * pageNumber - 1

  const onPageHandler = (page: number) => {
    setPageNumber(page);
  
    const tmpList: (IPreviewItem | ICommentItem)[] = [];

    const startIndex = COUNT * (page - 1);
    const endIndex = COUNT * page - 1;

    for (let index = startIndex; index <= endIndex; index++) {
      if (boardList.length < index + 1) break;
      tmpList.push(boardList[index]);
    }

    setViewList(tmpList);
  }

  useEffect(() => {
    onPageHandler(pageNumber);
  }, [boardList]);

  return {boardList, viewList, pageNumber, setBoardList, onPageHandler, COUNT};
}

export default usePagingHook;