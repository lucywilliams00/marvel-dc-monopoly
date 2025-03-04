import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import history from './history';
import { HiddenRoute } from './hiddenroutes';

import Login from './navigation/Login';
import SignUp from './navigation/SignUp';
import Account from './navigation/Account';

import Landing from './navigation/Landing';
import Home from './navigation/Home';

import NewGame from './navigation/NewGame';
import LoadGame from './navigation/LoadGame';
import PlayerSelection from './navigation/PlayerSelection';

import Users from './admin/Users';
import Games from './admin/Games';

import Board from './game/board';

function routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/home" component={Home} />

                <HiddenRoute exact path="/player-selection" component={PlayerSelection} />
                <HiddenRoute exact path="/new-game/:numberOfPlayers" component={NewGame} />
                <HiddenRoute exact path="/load-game" component={LoadGame} />

                <HiddenRoute exact path="/users" component={Users} />
                <HiddenRoute exact path="/games" component={Games} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/sign-up" component={SignUp} />
                <HiddenRoute exact path="/account" component={Account} />

                <Route exact path="/board/:gameID" component={Board} />
            </Switch>
        </Router>
    );
}

export default routes;
