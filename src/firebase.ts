import firebase from 'firebase/app';
import App from './appSettings';
import 'firebase/auth';

const config = App;

firebase.initializeApp(config);

export default firebase;
