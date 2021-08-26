import {takeLatest, call, put, all} from 'redux-saga/effects';
import ShopActionsTypes from './shop.types';
import {convertCollectionsSnapchotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionsFailure, fetchCollectionsSucccess} from "./shop.actions";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        //call allow us to defer control at this point of the execution back to the saga middleware
        const collectionsMap = yield call(convertCollectionsSnapchotToMap, snapshot);
        //put == dispatch
        yield put(fetchCollectionsSucccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    //take = call the function only 1 times - Create a blocking function that attempt the result
    //takeEvery - create new generator for each call - takeEvery create a non blocking call in order to no stop the application
    //takeLatest - create a generator only for the latest action that get dispatch
    yield takeLatest(ShopActionsTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
    yield (all([
        call(fetchCollectionsStart)
    ]))
}