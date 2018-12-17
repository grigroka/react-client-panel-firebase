import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import 'firebase/firestore';

// Reducers
import notifyReducer from './reducers/notifyReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyALVAztLRNPLbIrWWY7__iT57JK2X0zDC0',
  authDomain: 'react-client-panel-2510c.firebaseapp.com',
  databaseURL: 'https://react-client-panel-2510c.firebaseio.com',
  projectId: 'react-client-panel-2510c',
  storageBucket: 'react-client-panel-2510c.appspot.com',
  messagingSenderId: '777061992832'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // <- needed if using firestore
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Firestore timestamps setting
firebase.firestore().settings({ timestampsInSnapshots: true });

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
