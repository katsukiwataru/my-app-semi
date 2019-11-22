import firebase from 'firebase/app';
import App from './appSettings';
import 'firebase/auth';
import 'firebase/firestore';

const config = App;

firebase.initializeApp(config);

const firestore = firebase.firestore();

export default firebase;
export { firestore };
