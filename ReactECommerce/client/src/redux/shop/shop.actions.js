//import { firestore, convertCollectionsSnapchotToMap } from '../../firebase/firebase.utils';
import ShopActionsTypes from './shop.types';


export const fetchCollectionsStart = () => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSucccess = collectionsMap => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});


/**
 Si redux-thunk est activé en tant que middleware
 A chaque fois que l'on dispatch une fonction au lieu d'un objet
 Le middleware va call cette function avec la methode dispatch en first argument
 */
// export const fetchCollectionsStartAsync = () => {
//     return dispatch => {
//         const collectionRef = firestore.collection('collections');
//         dispatch(fetchCollectionsStart());
//         collectionRef.get()
//             .then(snapshot => {
//                 const collectionsMap = convertCollectionsSnapchotToMap(snapshot);
//                 dispatch(fetchCollectionsSucccess(collectionsMap));
//             })
//             .catch(error => dispatch(fetchCollectionsFailure(error.message)))
//     }
// };
