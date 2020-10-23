import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import './components/Navbar.js';
import Navbar from "./components/Navbar";
import Page1 from "./components/Page1";
import Login from "./components/Login";
import Page2 from "./components/Page2";
import APICalls from "./components/APICalls";
import firebase from "firebase";

class App extends Component {
    state = {
        data: null
    };

    constructor(props) {
        super(props);
        // TODO for setup: replace the export of firebase-config.js with your project's configuration snippet, found
        //      under Project Settings -> General -> Your Apps -> (your Firestore connected app) -> Firebase SDK snippet
        //      -> config.
        // Initialize Firebase
        firebase.initializeApp(require("./firebase-config.js").firebaseConfig);
    }

    //TEST FUNCTION
    componentDidMount() {
        // Call our fetch function below once the component mounts
        APICalls.SAVE_USER("testID2", {displayName: 'test', email: 'test@test.com', imageUrl: 'https://image.address.im'})
            .then(res => this.setState({ data: JSON.stringify(res) }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <div className='container'>
                        <p className="App-intro">{this.state.data}</p>
                        <Switch>
                            <Route exact path='/' component={Page1} />
                            <Route path='/login' component={Login} />
                            <Route path='/page2' component={Page2} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
