import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./firebase"; // Import Firebase config

const auth = getAuth(app);

// **Sign Up New User**
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error.message;
  }
};

// **Login User**
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error.message;
  }
};

// **Logout User**
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error.message;
  }
};

export default auth;
