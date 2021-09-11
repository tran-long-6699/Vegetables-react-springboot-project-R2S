import {userService} from '../service';
import {createAction} from '.'
import * as Types from './type';
import { history } from '../libs/history';

export const login = (user)=>{
    return (dispatch)=>{
        userService.signIn(user)
            .then(resp=>{
                dispatch(createAction(Types.LOGIN_SUCCESS, resp.data));
                localStorage.setItem('credentials', JSON.stringify(resp.data));
                history.replace('/home');
            })
            .catch(err=>{
                console.log(err);
            })
    };
}