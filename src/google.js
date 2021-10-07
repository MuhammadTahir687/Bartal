import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';


GoogleSignin.configure({
    webClientId: "609604028838-um6m727b3u2kd5peetq07pamp5m1lt9i.apps.googleusercontent.com",
});

export default async function onGoogleButtonPress(){
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}
