export const authorizationHeader = (accessToken: string) => {
    return {headers: { Authorization: `Bearer ${accessToken}` }};
}

const HOST = 'http:/localhost:4040/'

export const SIGN_UP_URL = `${HOST}auth/sign-up`;
export const SIGN_IN_URL = `${HOST}auth/sign-in`;
export const GET_USER_URL = `${HOST}api/user`;