import React, { Component } from "react";
import AuthenticationService from "../backend_communication/AuthenticationService";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthenticationService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                {currentUser.username ? <h1>{currentUser.username}</h1> : <h1>Error: no username</h1>}
                {currentUser.email ? <p>Email: {currentUser.email}</p> : <p>Error: no email address</p>}
                <input type='button' value="Change Password" />
                {currentUser.roles.map(role => {
                    switch (role) {
                        case "ROLE_USER":
                            return (<p>Public User Privileges</p>);
                        case "ROLE_ADMIN":
                            return (<p>Admin User Privileges</p>);
                        default:
                            return (<p>Error: no role(s)</p>);
                    }
                })}
                <p>{currentUser.accessToken}</p>
            </div>
        );
    }
}