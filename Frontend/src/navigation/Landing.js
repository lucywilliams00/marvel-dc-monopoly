import React from 'react';

import logo from '../images/menu_images/Logo.png';
import start from '../images/menu_images/Start.png';
import AuthenticationService from "../backend_communication/AuthenticationService";

import './Landing.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined
        }
    }

    componentDidMount() {
        const user = AuthenticationService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user
            });
        }
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div id='Landing-div'>
                <div>
                    <img id='Home-logo' src={logo} alt="Marvel DC Monopoly Logo" />
                </div>
                <div>
                    <a href={currentUser ? ("/home") : ("/login")}><img id='Home-start' src={start} alt="Start" /></a>
                </div>
            </div>
        );
    }
}

export default Home;