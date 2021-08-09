import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './../firebaseConfig/firebase.config';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const Google = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(Google)
        .then(res => {
            const { name, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: name,
                email: email,
                photo: photoURL,
                success: true
            };
            return signedInUser;
        })
}

export const handleSignout = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: '',
                name: '',
                email: '',
                password: '',
                photo: '',
                error: '',
                success: false
            }
            return signedOutUser;
        })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch( error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
 }


export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    })
        .then(res => {
        })
        .catch(err => {
            console.log(err);
        })
};

export const authToken = () => {
    firebase.auth().currentUser.getIdToken(true)
        .then(function (idToken) {
            localStorage.setItem('token', idToken);
        }).catch(function (error) {
            console.log(error);
        });
}

