export default interface ResponseDto<Data> {
    result: boolean;
    message: string;
    data: Data | null;
}