import {takeLatest, put, all, call} from 'redux-saga/effects';
import UserActionsTypes from './user.types';
import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from './user.actions';
import {auth, googleProvider, createUserProfilDocument, getCurrentUser} from '../../firebase/firebase.utils';


////////////////SNAPSHOT FROM USER AUTH///////////////////
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield createUserProfilDocument(userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

////////////////GOOGLE SIGN IN///////////////////
export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionsTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}


////////////////EMAIL SIGN IN///////////////////
export function* signInWithEmail({payload}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(payload.email, payload.password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionsTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}


////////////////CHECK USER SESSION///////////////////
export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionsTypes.CHECK_USER_SESSION, isUserAuthenticated);
}


////////////////SIGN OUT///////////////////
export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionsTypes.SIGN_OUT_START, signOut);
}

////////////////SIGN UP///////////////////
export function* signUp({payload: {email, password, displayName}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({
            user,
            additionalData: {displayName}
        }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionsTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionsTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}


export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpSuccess)
    ])
}