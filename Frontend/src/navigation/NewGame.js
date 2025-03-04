import React from 'react';

import './NewGame.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from '../history';

import characterArray from '../CharacterNames';
import Batman from '../images/character_images/Batman.png';
import CaptainAmerica from '../images/character_images/CaptainAmerica.png';
import Deadpool from '../images/character_images/Deadpool.png';
import Flash from '../images/character_images/Flash.png';
import Groot from '../images/character_images/Groot.png';
import HarleyQuinn from '../images/character_images/HarleyQuinn.png';
import IronMan from '../images/character_images/IronMan.png';
import Joker from '../images/character_images/Joker.png';
import Superman from '../images/character_images/Superman.png';
import Thanos from '../images/character_images/Thanos.png';
import Thor from '../images/character_images/Thor.png';
import WonderWoman from '../images/character_images/WonderWoman.png';
import GameService from '../backend_communication/GameService';
import PlayerService from '../backend_communication/PlayerService';

class NewGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfPlayers: 0,
            playerArray: [], // the array of player arrays
            gameName: "",
            numberOfRounds: 0,
            gameID: 0,
            errorMsg: ""
        };
    }

    componentDidMount() {
        var numberOfPlayers = parseInt(this.props.match.params.numberOfPlayers); // gets the number of players selected in the previous screen (PlayerSelection)

        this.setState(
            {
                numberOfPlayers: numberOfPlayers
            }
        );

        // the number of players depends on the user's decision therefore the size of the playerArray cannot be determined in the constructor
        // therefore this method creates a new array and populates it, then this is "added" to the previous state of the playerArray
        var newPlayerArray = new Array(numberOfPlayers);
        for (var index = 0; index < numberOfPlayers; index++) {
            newPlayerArray[index] = new Array(3);
            newPlayerArray[index][0] = ""; // the player's name
            newPlayerArray[index][1] = ""; // the player's character
            newPlayerArray[index][2] = false; // determine's whether the player is confirmed
        }

        this.setState(previousState => (
            {
                playerArray: [...previousState.playerArray, ...newPlayerArray] // this method adds values to an array
            }
        ));
    }

    setGameName = (gameNameInput) => {
        this.setState(
            {
                gameName: gameNameInput.target.value
            }
        )
    }

    setNumberOfRounds = (numberOfRoundsSelected) => {
        this.setState(
            {
                numberOfRounds: numberOfRoundsSelected.target.value
            }
        );
    }

    setPlayerInfo(playerNumber) {
        const { numberOfPlayers, playerArray } = this.state;
        var playerName = document.getElementById("player-" + playerNumber + "-name").value;
        var playerCharacter = "";
        var charactersUnchecked = 0;

        if (playerName.replace(/\s/g, '') === '') {
            alert("Warning for Player " + (playerNumber + 1) + "\n\nPlease enter a name.");
        } else {
            for (var i = 0; i < 12; i++) {
                var characterImage = document.getElementById(characterArray[i] + playerNumber); // playerNumber doesn't need + 1 because document.getElementById needs the index 

                if (characterImage.checked) {
                    var characterExists = false;

                    playerCharacter = characterImage.value;
                    for (var j = 0; j < numberOfPlayers; j++) {
                        if (playerArray[j][1] === playerCharacter) {
                            characterExists = true;
                            break;
                        }
                    }

                    if (characterExists === true) {
                        alert("Warning for Player " + (playerNumber + 1) + "\n\nPlayer " + (j + 1) + " has already selected " + playerCharacter);
                    } else {
                        var tempPlayerArray = [...playerArray]; // creates a copy of the player array
                        var tempCurrentPlayer = { ...tempPlayerArray[playerNumber] }; // creates a copy of the current player array (don't think this is needed)
                        tempCurrentPlayer[0] = playerName; // sets the first index as the player's current position
                        tempCurrentPlayer[1] = playerCharacter; // sets the second index as the player's current property
                        tempCurrentPlayer[2] = true; // sets the third index to true to confirm the player
                        tempPlayerArray[playerNumber] = tempCurrentPlayer; // sets the tempPlayerArray's current player array

                        this.setState(
                            {
                                playerArray: tempPlayerArray // this method updates the values in an array
                            }
                        );

                        document.getElementById("button" + playerNumber).disabled = true;
                    }
                } else {
                    charactersUnchecked++;
                }
            }

            if (charactersUnchecked === 12) {
                alert("Warning for Player " + (playerNumber + 1) + "\n\nPlease select a character.");
            }
        }
    }

    createGame = () => {
        const { numberOfPlayers, playerArray, gameName, numberOfRounds } = this.state;

        var message = "The following players are not confirmed:\n\n";
        for (var i = 0; i < numberOfPlayers; i++) {
            if (playerArray[i][2] === false) {
                message += "Player " + (i + 1) + "\n"
            }
        }

        if (gameName === "") {
            alert("Enter a game name.");
        } else if (numberOfRounds === 0) {
            alert("Select the number of rounds.");
        } else if (message === "The following players are not confirmed:\n\n") {
            // db calls:
            GameService.createGame(
                gameName,
                parseInt(numberOfRounds)
            ).then(
                response => {
                    for (var p = 0; p < numberOfPlayers; p++) {
                        PlayerService.createPlayer(
                            response.data.gameID,
                            playerArray[p][0],
                            playerArray[p][1]
                        ).then(
                            response => {
                                alert(response.data.message);
                            }, error => {
                                alert(error.message); // I assume that despite the error, it will still push the below
                            }
                        )
                    }

                    history.push("/board/" + response.data.gameID); // should I get createPlayer to return the gameID too to be able to get the game and its players on the board
                    window.location.reload();
                }, error => {
                    alert(error.message);
                });
        } else {
            alert(message);
        }
    }

    render() {
        const { numberOfPlayers, numberOfRounds, gameName } = this.state;
        return (
            <div id='new-game-div'>
                <div id='game-information-div'>
                    <div className='game-name-div'>
                        <p>Game Name</p>
                        <input type='input' className='form-control' id='game-name' value={gameName} onChange={this.setGameName} />
                    </div>
                    <br />
                    <div className='game-length-div'>
                        <p>Number of Rounds:</p>
                        <select id="game-length-select" value={numberOfRounds} onChange={this.setNumberOfRounds}>
                            <option value="0">--Select One--</option>
                            <option value="10">Short Game - 10 Rounds</option>
                            <option value="30">Normal Game - 30 Rounds</option>
                            <option value="50">Long Game - 50 Rounds</option>
                            <option value="1">Unlimited</option>
                        </select>
                    </div>
                    <br />
                </div>
                <div id='player-creation-div'>
                    {[...Array(numberOfPlayers)].map((elementInArray, index) => (
                        <div className='player-info-div'>
                            <br />
                            <p>{"Player " + (index + 1)}</p>
                            <div className='player-name-div'>
                                <p>{"Player " + (index + 1) + " Name:"}</p>
                                <input type='input' className='form-control' id={"player-" + index + "-name"} />
                            </div>
                            <br />
                            <div className='player-character-div'>
                                <p>Choose Character:</p>
                                <input type='radio' name={'character' + index} id={'Batman' + index} value="Batman" className='hidden-input' />
                                <label htmlFor={'Batman' + index}>
                                    <img className='character-image' src={Batman} alt="Batman" />
                                </label>
                                <input type='radio' name={'character' + index} id={'CaptainAmerica' + index} value="CaptainAmerica" className='hidden-input' />
                                <label htmlFor={'CaptainAmerica' + index}>
                                    <img className='character-image' src={CaptainAmerica} alt="Captain America" />
                                </label>
                                <input type='radio' name={'character' + index} id={'Deadpool' + index} value="Deadpool" className='hidden-input' />
                                <label htmlFor={'Deadpool' + index}>
                                    <img className='character-image' src={Deadpool} alt="Deadpool" />
                                </label>
                                <input type='radio' name={'character' + index} id={'Flash' + index} value="Flash" className='hidden-input' />
                                <label htmlFor={'Flash' + index}>
                                    <img className='character-image' src={Flash} alt="Flash" />
                                </label>
                                <input type='radio' name={'character' + index} id={'Groot' + index} value="Groot" className='hidden-input' />
                                <label htmlFor={'Groot' + index}>
                                    <img className='character-image' src={Groot} alt="Groot" />
                                </label>
                                <input type='radio' name={'character' + index} id={'HarleyQuinn' + index} value="HarleyQuinn" className='hidden-input' />
                                <label htmlFor={'HarleyQuinn' + index}>
                                    <img className='character-image' src={HarleyQuinn} alt="Harley Quinn" />
                                </label>
                                <input type='radio' name={'character' + index} id={'IronMan' + index} value="IronMan" className='hidden-input' />
                                <label htmlFor={'IronMan' + index}>
                                    <img className='character-image' src={IronMan} alt="Iron Man" />
                                </label>
                                <input type='radio' name={'character' + index} id={'Joker' + index} value="Joker" className='hidden-input' />
                                <label htmlFor={'Joker' + index}>
                                    <img className='character-image' src={Joker} alt="Joker" />
                                </label>
                                <input type='radio' name={'character' + index} id={'Superman' + index} value="Superman" className='hidden-input' />
                                <label htmlFor={'Superman' + index}>
                                    <img className='character-image' src={Superman} alt="Superman" />
                                </label>
                                <input type='radio' name={'character' + index} id={'Thanos' + index} value="Thanos" className='hidden-input' />
                                <label htmlFor={'Thanos' + index}>
                                    <img className='character-image' src={Thanos} alt="Thanos" />
                                </label>
                                <input type='radio' name={'character' + index} id={'Thor' + index} value="Thor" className='hidden-input' />
                                <label htmlFor={'Thor' + index}>
                                    <img className='character-image' src={Thor} alt="Thor" />
                                </label>
                                <input type='radio' name={'character' + index} id={'WonderWoman' + index} value="WonderWoman" className='hidden-input' />
                                <label htmlFor={'WonderWoman' + index}>
                                    <img className='character-image' src={WonderWoman} alt="Wonder Woman" />
                                </label>
                            </div>
                            <br />
                            <button id={"button" + index} onClick={() => this.setPlayerInfo(index)}>Confirm Player</button>
                            <br />
                            <br />
                        </div>
                    ))}
                    <br />
                </div>
                <button onClick={this.createGame}>Create Game</button>
            </div>
        );
    }
}

export default NewGame;