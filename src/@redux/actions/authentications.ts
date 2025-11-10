import { Dispatch } from 'redux';
import { ACTIONS, TYPES, IAuthenticationsSignup, IAuthenticationsLogin, AuthenticationsObjectKeys, IAuthenticationsForgot, IAuthenticationsReset } from '@redux/types/authentications';
import { api } from '@redux/api';
import { user_authentication } from '@localstorage';

const endpoint = "/authentications"

const login = (data: IAuthenticationsLogin) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.post(`${endpoint}/login`, data);
        dispatch({
            type: TYPES.AUTHENTICATIONS_SIGNIN,
            payload: res.data.data
        });
        user_authentication.set(res.data.cookie);
    } catch(error:any){
        dispatch({
            type: TYPES.AUTHENTICATIONS_RESPONSE_ERROR,
            payload: {login: error.response.data.message}
        });
        console.log(error.response.data)
    }
};

const signup = (data: IAuthenticationsSignup) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.post(`${endpoint}/signup`, data);
        dispatch({
            type: TYPES.AUTHENTICATIONS_SIGNUP,
            payload: res.data.data
        });
        user_authentication.set(res.data.cookie);
    } catch(error:any){
        dispatch({
            type: TYPES.AUTHENTICATIONS_RESPONSE_ERROR,
            payload: {signup: error.response.data.message}
        });
        console.log(error.response)
    }
};

const load = () => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.get(`${endpoint}/load`);
        dispatch({
            type: TYPES.AUTHENTICATIONS_LOAD,
            payload: res.data.data
        });
    } catch(error:any){
        dispatch({
            type: TYPES.AUTHENTICATIONS_RESPONSE_ERROR,
            payload: { load: error.response.data.message }
        });
        console.log(error.response)
    }
};

const reset = (data: IAuthenticationsReset) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.post(`${endpoint}/reset`, data);
        dispatch({
            type: TYPES.AUTHENTICATIONS_RESET,
            payload: res.data.data
        });
        user_authentication.set(res.data.cookie);
    } catch(error:any){
        dispatch({
            type: TYPES.AUTHENTICATIONS_RESPONSE_ERROR,
            payload: {reset: error.response.data.message}
        });
        console.log(error.response)
    }
};

const forgot = (data: IAuthenticationsForgot) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.post(`${endpoint}/forgot`, data);
        dispatch({
            type: TYPES.AUTHENTICATIONS_FORGOT,
            payload: {forgot: "success" }
        });
        user_authentication.set(res.data.cookie);
    } catch(error:any){
        dispatch({
            type: TYPES.AUTHENTICATIONS_RESPONSE_ERROR,
            payload: {forgot: error.response.data.message}
        });
        console.log(error.response)
    }
};

const state_errors = (key:string, value: string) => async (dispatch: Dispatch<ACTIONS>) => {
    dispatch({
        type: TYPES.AUTHENTICATIONS_RESPONSE_ERROR,
        payload: {[key]: value}
    });
};


const state_clear = (key:AuthenticationsObjectKeys, value: any) => async (dispatch: Dispatch<ACTIONS>) => {
    dispatch({
        type: TYPES.AUTHENTICATIONS_RESPONSE_CLEAR,
        payload: { key, value }
    });
};

const Authentication = {
    login,
    signup,
    load,
    reset,
    forgot,
    state_errors,
    state_clear
};

export default Authentication;