export const authorizationHeader = (accessToken: string) => {
    return {headers: { Authorization: `Bearer ${accessToken}` }};
}

const HOST = 'http://localhost:4040/'

export const SIGN_UP_URL = `${HOST}auth/sign-up`;

export const SIGN_IN_URL = `${HOST}auth/sign-in`;

export const GET_USER_URL = `${HOST}api/user/`;

export const GET_LIST_URL = `${HOST}api/board/list`;
export const GET_MY_LIST_URL = `${HOST}api/board/my-list`;
export const GET_TOP3_LIST_URL = `${HOST}api/board/top3-list`;
export const GET_TOP15_SEARCH_WORD_URL = `${HOST}api/board/top15-search-word`;
export const POST_BOARD_URL = `${HOST}api/board/`;

export const GET_BOARD_URL = (boardNumber: string) => `${HOST}api/board/${boardNumber}`;
export const GET_SEARCH_LIST_URL = (content: string) => `${HOST}api/board/search-list/${content}`;
export const GET_TOP15_RELATED_SEARCH_WORD_URL = (content: string) => `${HOST}api/board/top15-related-search-word/${content}`