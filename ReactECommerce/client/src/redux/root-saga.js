import {all, call} from 'redux-saga/effects';
import {shopSagas} from './shop/shop.sagas';
import {userSagas} from './user/user.sagas';
import {cartSagas} from "./cart/cart.sagas";

export default function* rootSaga() {
    //all = run all saga concurrently (at the same time)
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas)
    ]);
}