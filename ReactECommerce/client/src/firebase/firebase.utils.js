import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA8LovCJyv1FoRj9NTklZ8zrmcE5SNk9qo",
    authDomain: "crownclothingdb-51c3e.firebaseapp.com",
    projectId: "crownclothingdb-51c3e",
    storageBucket: "crownclothingdb-51c3e.appspot.com",
    messagingSenderId: "254148720330",
    appId: "1:254148720330:web:67497fd19b8ee5e3776633"
};


/**
 *
 * @param userAuth
 * @param additionalData
 */
export const createUserProfilDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    //.doc & .get always return a response, even if the user document doesnt exist
    //Reference
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    //Snapshot
    const snapShot = await userRef.get();
    //exists check if a document exist at this query
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("error creation user", error.message)
        }
    }
    return userRef;
};

/**
 *
 * @param collectionKey
 * @param objectsToAdd
 * @returns {Promise<void>}
 */
export const importCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    //use batch to group set method on firestore
    const batch = firestore.batch();
    objectsToAdd.forEach(object => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, object);
    });

    return await batch.commit()
};

/**
 *
 * @param collections
 * @returns {{}}
 */
export const convertCollectionsSnapchotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            id: doc.id,
            routeName: encodeURI(title.toLowerCase()),
            title,
            items
        }
    });
    //return hats: [collection], jackets:[collection]...
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

firebase.initializeApp(config);

/**
 * Vérifie si le user est authentifié (firebase check on session)
 * @returns {Promise<userAuth>}
 */
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth)
        }, reject)
    })
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;