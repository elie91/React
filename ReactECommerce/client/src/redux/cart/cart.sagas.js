import {takeLatest, put, all, call} from 'redux-saga/effects';
import UserActionsTypes from "../user/user.types";
import {clearCart} from "./cart.actions";

export function* clearCartOnSignOut() {
    yield put(clearCart());
}

export function* onSignOutSucess() {
    yield takeLatest(UserActionsTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
    yield(all([
        call(onSignOutSucess)
    ]));
}