// student number: 223011367
// firebase setup

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDFR4K984ieudpe6PwWsl1U9T53W-Ezm9Q",
  authDomain: "uj-task-hub-ae7b8.firebaseapp.com",
  projectId: "uj-task-hub-ae7b8",
  storageBucket: "uj-task-hub-ae7b8.firebasestorage.app",
  messagingSenderId: "201998194449",
  appId: "1:201998194449:web:132dee8f97634882df1eb0"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)