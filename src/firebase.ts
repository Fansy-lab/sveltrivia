// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB-IbJMhk4YtmBii5D7J9TqNJ91ci7QXqc',
	authDomain: 'sveltrivia.firebaseapp.com',
	projectId: 'sveltrivia',
	storageBucket: 'sveltrivia.appspot.com',
	messagingSenderId: '947357334850',
	appId: '1:947357334850:web:3dbe7688347670d88c5cdb'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const addSomething = async (message: string) => {
	const docRef = await addDoc(collection(db, 'players'), {
		first: 'Ada',
		last: 'Lovelace',
		born: 1815
	});
};
