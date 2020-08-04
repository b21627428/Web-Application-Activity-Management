import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FBKEY,
	authDomain: process.env.REACT_APP_FBAUTHDOMAIN,
	databaseURL: process.env.REACT_APP_FBDBURL,
	projectId: process.env.REACT_APP_FBPROJECTID,
	storageBucket: process.env.REACT_APP_FBSTORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_FBSENDERID,
	appId: process.env.REACT_APP_FBAPPID,
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
