import UserActionsTypes from './user.types';
import {postRequest} from "../../utils/fetch";

export const signInStart = () => ({
    type: UserActionsTypes.SIGN_IN_START
});

export const signInSuccess = user => ({
    type: UserActionsTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: UserActionsTypes.SIGN_IN_FAILURE,
    payload: error
});

export const checkUserSession = () => ({
    type: UserActionsTypes.CHECK_USER_SESSION
});

export const signInStartAsync = usernameAndPassword => {
    return dispatch => {
        dispatch(signInStart());
        postRequest(`${process.env.REACT_APP_API_ENTRYPOINT}/login`, usernameAndPassword)
            .then(response => {
                if (response.status === 200) {
                    dispatch(signInSuccess({usernameAndPassword}));
                } else {
                    dispatch(signInFailure("Identifiants invalides"));
                }
            })


    }
}