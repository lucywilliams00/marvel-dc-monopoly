import { React } from "react";
import { Route, Redirect } from 'react-router-dom';

export const HiddenRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem("user")
            ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
    )} />
)