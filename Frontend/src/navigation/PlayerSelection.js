import React from 'react';
import history from '../history';

import './PlayerSelection.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import fourPlayersImage from '../images/menu_images/4Players.png';
import fivePlayersImage from '../images/menu_images/5Players.png';
import sixPlayersImage from '../images/menu_images/6Players.png';

class PlayerSelection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customNumberOfPlayers: 0
        };
    }

    onChangeCustomNumberOfPlayers = (input) => {
        this.setState(
            {
                customNumberOfPlayers: input.target.value
            }
        );
    }

    customPlayerSelection = () => {
        const { customNumberOfPlayers } = this.state;
        var numberOfPlayers = parseInt(customNumberOfPlayers);

        if (Number.isInteger(numberOfPlayers) && numberOfPlayers > 1 && numberOfPlayers < 11) {
            history.push('/new-game/' + numberOfPlayers);
        } else {
            alert("Please enter an integer between 2 and 10 or select one of the player selection values.");
        }
    }

    render() {
        const { customNumberOfPlayers } = this.state;
        return (
            <div id='PlayerSelection-div'>
                <h1>Player Selection</h1>
                <a href='/new-game/4' className='PlayerSelection-link'><img id='PlayerSelection-4' className='PlayerSelection-image' src={fourPlayersImage} alt="Four Players" /></a>
                <a href='/new-game/5' className='PlayerSelection-link'><img id='PlayerSelection-5' className='PlayerSelection-image' src={fivePlayersImage} alt="Five Players" /></a>
                <a href='/new-game/6' className='PlayerSelection-link'><img id='PlayerSelection-6' className='PlayerSelection-image' src={sixPlayersImage} alt="Six Players" /></a>

                <div id='PlayerSelection-custom-div'>
                    <label htmlFor="player-selection-input">Custom Number of Players:</label>
                    <input id='PlayerSelection-input' type='text' name="player-selection-input" value={customNumberOfPlayers} onChange={this.onChangeCustomNumberOfPlayers} />
                    <button onClick={this.customPlayerSelection}>Start New Game</button>
                </div>
            </div>
        );
    }
}

export default PlayerSelection;