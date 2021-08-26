import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import rootSaga from "./root-saga";


const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));


//In the first iteration, the middleware invokes the next() method to retrieve the next Effect.
// The middleware then executes the yielded Effect as specified by the Effects API below.
// Meanwhile, the Generator will be suspended until the effect execution terminates.
// Upon receiving the result of the execution, the middleware calls next(result) on the Generator passing it the retrieved result as an argument.
// This process is repeated until the Generator terminates normally or by throwing some error.
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
