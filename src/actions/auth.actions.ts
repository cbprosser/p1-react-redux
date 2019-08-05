import { ersClientLogin } from "../axios/ers-client";

export const authTypes = {
    UPDATE_CURRENT_USER: '[AUTH] UPDATE CURRENT USER',
    FAILED_LOGIN: '[AUTH] FAILED LOGIN'
}

export const login = (credentials: any, history: any) => async (dispatch: any) => {
    try {
        const resp = await ersClientLogin.post('/login', credentials);
        const token = resp.data.token.split('.');
        const user = JSON.parse(atob(token[1])).user;
        const userToken = {
            user,
            token
        }
        
        dispatch({
            type: authTypes.UPDATE_CURRENT_USER,
            payload: userToken
        })
        history.push('/');
    } catch (err) {
        console.log(err);
        console.log('invalid credentials');
        dispatch({
            type: authTypes.FAILED_LOGIN,
            payload: 'Invalid Credentials'
        });
    }
}