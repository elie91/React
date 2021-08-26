import UserActionsTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    isLoading: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case UserActionsTypes.SIGN_IN_START:
            return {
                ...state,
                isLoading: true
            };

        case UserActionsTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
                isLoading: false
            };

        case UserActionsTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };

        default:
            return state;
    }
};

export default userReducer;