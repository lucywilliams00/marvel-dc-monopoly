import React from 'react';

// import './loadGame.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameService from '../backend_communication/GameService';

class LoadGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            savedGames: [],
            errorMsg: ""
        }
    }

    componentDidMount() {
        GameService.getAllSavedGames().then(response => {
            this.setState(
                {
                    savedGames: response.data
                }
            )
        }, error => {
            this.setState(
                {
                    errorMsg: error.message
                }
            )
        });
    }

    render() {
        const { savedGames, errorMsg } = this.state;
        return (
            <div id='LoadGame-div'>
                <h1>Load Game</h1>
                {savedGames.map(game => <h3>{game.name}</h3>)}
                <p>{errorMsg}</p>
            </div>
        );
    }
}

export default LoadGame;