// sign-in.store.ts
//# Java Class 또는 React의 컴포넌트의 파일명은 UpperCamelCase를 따랐음
//# Typescript의 경우 특별한 파일의 네이밍 규칙이 지정되어있지 않기 때문에
//# 필수적으로 UpperCamelCase를 사용할 필요가 없음

//# Zustand를 사용하여 스토어 생성
//^ zustand에서 create 요소를 import 
import { create } from "zustand";

//# Typescript에서 함수의 타입을 지정하는 방법
//? (매개변수명: 매개변수타입) => 반환타입
interface ISignUpStore {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
    telNumber: string;
    address: string;
    addressDetail: string;
    setEmail: (str: string) => void;
    setPassword: (str: string) => void;
    setPasswordCheck: (str: string) => void;
    setNickname: (str: string) => void;
    setTelNumber: (str: string) => void
    setAddress: (str: string) => void;
    setAddressDetail: (str: string) => void;
}

//^ create 메서드를 사용해서 store를 생성
const useStore = create<ISignUpStore>((set) => ({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    telNumber: '',
    address: '',
    addressDetail: '',
    setEmail: (email) => set((state) => ({...state, email})),
    setPassword: (password) => set((state) => ({...state, password})),
    setPasswordCheck: (passwordCheck) => set((state) => ({...state, passwordCheck})),
    setNickname: (nickname) => set((state) => ({...state, nickname})),
    setTelNumber: (telNumber) => set((state) => ({...state, telNumber})),
    setAddress: (address) => set((state) => ({...state, address})),
    setAddressDetail: (addressDetail) => set((state) => ({...state, addressDetail})),
}))

export default useStore;

//# 일반적인 상태를 선언하는 코드
//? const [상태명, set메서드(상태를 변경하는 메서드)] = useState<데이터타입>(초기화값);

//# Zustand를 사용해서 상태를 선언한느 코드
//? const useStore = create<데이터타입>((set) => ({
//?     상태명1: 초기화값,
//?     상태명2: 초기화값,
//?     상태명3: 초기화값,
//?     ...,
//?     set상태명1(상태를 변경하는 메서드): (상태명1) => set((state) => ({...state, 상태명1})),
//?     set상태명2(상태를 변경하는 메서드): (상태명2) => set((state) => ({...state, 상태명2})),
//?     set상태변경(상태를 변경하는 메서드): (상태명1, 상태명2) => set((state) => ({...state, 상태명1, 상태명2})),
//?     ...,
//? }));

//^ 1. const useStore = create((set) => ({ ... }))
//^    :== useState

//^ 2. 상태명: 초기화값,
//^    :== [상태명, ...] = ...(초기화값)

//^ 3. set메서드: (파라미터) => set((state) => ({...state, 파라미터}))
//^    :== [..., set메서드]

//# spread 연산자
//? const { 요소1, 요소2, ... } = 객체;
//? ...객체 : 객체에서 지정한 요소를 제외하고 남은 요소를 객체로 묶음 처리 함
//? const { 요소1, ...묶음객체명 } = 객체;

const mainObj = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
}

const { a, ...subObj } = mainObj;
//? subObj = { b: 1, c: 2, d: 3 };

const setMainObjA = (a: number) => {
    // mainObj.a = a;
    const modifiedObj = {...mainObj, a};
    return modifiedObj;
}
const setMainObjB = (b: number) => {
    // mainObj.a = a;
    const modifiedObj = {...mainObj, b};
    return modifiedObj;
}

const tmpObj = setMainObjA(10);
// {
//     a: 10,
//     b: 1,
//     c: 2,
//     d: 3,
// }