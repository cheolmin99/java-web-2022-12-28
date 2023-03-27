interface ResponseDto {
    address: string;
    email: string;
    expiredTime: number;
    nickname: string;
    profile: string | null;
    telNumber: string;
    token: string;
}

export default ResponseDto;