import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import Routes from './routes';
import logo from './images/menu_images/Logo.png';
import AuthenticationService from "./backend_communication/AuthenticationService";
import AuthenticationVerification from './backend_communication/AuthenticationVerification';
import EventBus from "./backend_communication/AuthenticationEventListener";
import history from './history';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined
        }

        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        AuthenticationService.logout();

        this.setState({
            currentUser: undefined
        });

        history.push("/");
    }

    componentDidMount() {
        const user = AuthenticationService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                publicUser: user.roles.includes("ROLE_USER"),
                adminUser: user.roles.includes("ROLE_ADMIN")
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    // would be better if we could have our own css even if it just mimicks the bootstrap css
    render() {
        const { currentUser, publicUser, adminUser } = this.state;
        return (
            <div id='App-div'>
                <Navbar id='App-Navbar' expand='lg' collapseOnSelect>
                    <Container>
                        <Navbar.Brand href="/"><img id='App-Navbar-brand' src={logo} alt="Marvel DC Monopoly" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='me-auto'>
                                {currentUser && <Nav.Link href="/home" className='App-Nav-Link'>Home</Nav.Link>}

                                {currentUser && publicUser && <Nav.Link href="/player-selection" className='App-Nav-Link'>New Game</Nav.Link>}
                                {currentUser && publicUser && <Nav.Link href="/load-game" className='App-Nav-Link'>Load Game</Nav.Link>}

                                {currentUser && adminUser && <Nav.Link href="/users" className='App-Nav-Link'>Users</Nav.Link>}
                                {currentUser && adminUser && <Nav.Link href="/games" className='App-Nav-Link'>Games</Nav.Link>}
                            </Nav>
                            <Nav>
                                <NavDropdown title={currentUser ? (currentUser.username) : ("Account")}>
                                    {currentUser ? (<NavDropdown.Item href="/account">Account</NavDropdown.Item>) : (<NavDropdown.Item href="/sign-up">Sign Up</NavDropdown.Item>)}
                                    {currentUser ? (<NavDropdown.Item onClick={this.logOut}>Logout</NavDropdown.Item>) : (<NavDropdown.Item href="/login">Login</NavDropdown.Item>)}
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div id='App-content'>
                    <Routes />
                </div>
                <AuthenticationVerification logOut={this.logOut} />
            </div>
        );
    }
}

export default App;
