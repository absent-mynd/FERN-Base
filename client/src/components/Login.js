import React from 'react';
import firebase from 'firebase';
import './APICalls';
import APICalls from "./APICalls";

class Login extends React.Component {

    loginPrompt = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        return await firebase.auth().signInWithPopup(provider).then(await function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //var token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            console.log(user.displayName + " just logged in with unique id " + user.uid);
            return user
        }).catch(function (error) {
            console.log(('BigError'));
            throw error;
        });
    };

    componentDidMount() {
        this.loginPrompt().then((user) => {
            console.log(('testing 1'))
            if (user) {
                console.log(('testing 2'));
                APICalls.GET_USER(user.uid).then(dbUser => {
                    console.log(dbUser);
                }).catch(err => {
                    APICalls.addNewUserFromGUser(user);
                });
            }
        });
    };

    render() {
        return (
            <div className='login'>
                <h1>Welcome to the login page!</h1>
                <h2>HTML goes here!</h2>
            </div>
        );
    };
}

export default Login;