import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.init";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    //user Register with Email
    const userRegisterInEmail = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //sign In with email password
    const userSignInEmail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //sing In with Google
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }
    //signOut 
    const handleLogout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unsbucribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // jwt token
            if(currentUser){
                // get token and store client
                const userInfo = {email: currentUser?.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        // if you used http quickies not deleted client side
                        //store in localStorage
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
            } 
            else{
                // do something
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });

        return () => {
            return unsbucribe();
        }
    }, [axiosPublic])
    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        userRegisterInEmail,
        userSignInEmail,
        loginWithGoogle,
        handleLogout,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

