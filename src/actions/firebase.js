import * as  firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBMKIpGMSTdC5H4NpsbjiBhCTctpFQ1CpU",
  authDomain: "prokure.firebaseapp.com",
  databaseURL: "https://prokure.firebaseio.com",
  storageBucket: "project-1502850120591354565.appspot.com",
  messagingSenderId: "262399359247"
};

export const firebaseApp = firebase.initializeApp(config);
