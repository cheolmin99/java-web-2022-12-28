export const authorizationHeader = (accessToken: string) => {
    return {headers: { Authorization: `Bearer ${accessToken}` }};
}
export const mutipartHeader = () => {
    return { headers: { 'Content-Type': 'multipart/form-data' }};
}

const HOST = 'http://localhost:4040/'

export const SIGN_UP_URL = `${HOST}auth/sign-up`;
export const SIGN_IN_URL = `${HOST}auth/sign-in`;

export const GET_USER_URL = `${HOST}api/user/`;
export const PATCH_PROFILE_URL = `${HOST}api/user/profile`;

export const GET_LIST_URL = `${HOST}api/board/list`;
export const GET_MY_LIST_URL = `${HOST}api/board/my-list`;
export const GET_TOP3_LIST_URL = `${HOST}api/board/top3-list`;
export const GET_TOP15_SEARCH_WORD_URL = `${HOST}api/board/top15-search-word`;

export const POST_BOARD_URL = `${HOST}api/board/`;
export const POST_COMMENT_URL = `${HOST}api/board/comment`;
export const LIKE_URL = `${HOST}api/board/like`;
export const VALIDATE_EMAIL_URL = `${HOST}api/user/validate/email`;
export const VALIDATE_NICKNAME_URL = `${HOST}api/user/validate/nickname`;
export const VALIDATE_TEL_NUMBER_URL = `${HOST}api/user/validate/tel-number`;

export const PATCH_BOARD_URL = `${HOST}api/board/`;

export const GET_BOARD_URL = (boardNumber: string) => `${HOST}api/board/${boardNumber}`;
export const GET_SEARCH_LIST_URL = (content: string, previous: string) => previous ? `${HOST}api/board/search-list/${content}/${previous}` : `${HOST}api/board/search-list/${content}`;
export const GET_TOP15_RELATED_SEARCH_WORD_URL = (content: string) => `${HOST}api/board/top15-related-search-word/${content}`

export const DELETE_BOARD_URL = (boardNumber: string) => `${HOST}api/board/${boardNumber}`;

export const FILE_UPLOAD_URL = `${HOST}file/upload`;