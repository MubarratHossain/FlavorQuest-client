import React, { createContext, useState, useEffect } from "react";
import auth from "../../config/firebase.init";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    const createUser = async (email, password, name, photoURL) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;
            console.log('Registered User', newUser.email);

            await updateProfile(newUser, { displayName: name, photoURL });
            setIsRegistered(false); 
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const loginWithEmail = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setIsRegistered(true); 

            const user = { email: userCredential.user.email };
            axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                .then(res => {
                    console.log('login token', res.data);
                    setIsRegistered(true); 
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));

        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            setUser(userCredential.user);
            setIsRegistered(false); 

            const user = { email: userCredential.user.email };
            axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                .then(res => {
                    console.log('login token', res.data);
                    setIsRegistered(true); 
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));

        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
            setUser(null);
            setIsRegistered(false); 
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setIsRegistered(true);
            } else {
                axios
                    .post('http://localhost:5000/logout', {}, { withCredentials: true })
                    .then(res => {
                        console.log('logout', res.data);
                    })
                    .catch(err => console.error(err));
            }
            setLoading(false); 
        });
    
        return () => unsubscribe();
    }, []);
    

    const authInfo = {
        user,
        loading,
        error,
        isRegistered,
        createUser,
        loginWithEmail,
        loginWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
