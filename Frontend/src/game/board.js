import React from 'react';

import './board.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GameService from "../backend_communication/GameService";
import PlayerService from '../backend_communication/PlayerService';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPlayer: 1, // the current player
            currentProperty: "Go", // the current property of the current player
            dice1: 0, // the first dice
            dice2: 0, // the second dice
            error: "No current error.", // the error of any backend communication
            hasRolled: false, // a flag that indicates whether the user has rolled
            isProperty: false, // a flag that indicates whether the current property is a property
            playerArray: [], // the array of player arrays
            properties: [], // the array of properties (properties being all places on the Monopoly board, not just purchasable properties)
            gameSettings: []
        }
    }

    componentDidMount() {
        GameService.loadGame(parseInt(this.props.match.params.gameID)).then(response => {
            this.setState(
                {
                    gameSettings: response.data
                }
            )
        });

        // I need to create this service
        PlayerService.loadPlayers(parseInt(this.props.match.params.gameID)).then(response => {
            this.setState(
                {
                    playerArray: response.data
                }
            )
        });

        // backend communication - gets all of the properties from the property table
        GameService.getAllProperties().then(response => {
            this.setState(
                {
                    properties: response.data
                }
            )
        }, error => {
            this.setState(
                {
                    error: error.message
                }
            )
        });
    }

    // this might need upgrading for the other times a player moves around the board
    // when a person picks up a community/chance card, it might tell them to move
    rollDiceUpdatePlayerPosition = () => {
        const { currentPlayer, playerArray, properties } = this.state;

        var roll1 = Math.floor(Math.random() * 6) + 1; // simulates one dice roll
        var roll2 = Math.floor(Math.random() * 6) + 1; // simulates one dice roll
        var roll = roll1 + roll2; // combines the dice rolls

        var newPosition = playerArray[currentPlayer - 1][0] + roll; // adds the roll to the player's current position
        if (newPosition > 40) { // this determines whether player has made it round the board
            newPosition = newPosition - 40;
            // add £200 for passing GO
        }

        var propertyName;
        properties.forEach(function (property) { // loops through the list of properties
            if (property.position === newPosition) {
                propertyName = property.name; // sets the player's current property
            }
        });

        var tempPlayerArray = [...playerArray]; // creates a copy of the player array
        var tempCurrentPlayer = { ...tempPlayerArray[currentPlayer - 1] }; // creates a copy of the current player array (don't think this is needed)
        tempCurrentPlayer[0] = newPosition; // sets the first index as the player's current position
        tempCurrentPlayer[1] = propertyName; // sets the second index as the player's current property
        tempPlayerArray[currentPlayer - 1] = tempCurrentPlayer; // sets the tempPlayerArray's current player array 

        var positionType = '';
        // backend communication - gets the position's property type
        GameService.getPositionType(newPosition).then(response => {
            positionType = response.data;
        }, error => {
            this.setState(
                {
                    error: error.message
                }
            )
        });

        var isPropertyCheck = false;
        if (positionType === "TYPE_PROPERTY") { // checks if the current position is a property
            isPropertyCheck = true;
        }

        this.setState(
            {
                currentProperty: propertyName,
                dice1: roll1,
                dice2: roll2,
                hasRolled: true,
                isProperty: isPropertyCheck,
                playerArray: tempPlayerArray // this method updates the values in an array
            }
        );
    }

    buyProperty = () => {
        const { currentPlayer, playerArray, currentProperty } = this.state;
        var propertyToBuy = currentProperty;

        var tempPlayerArray = [...playerArray]; // creates a copy of the player array
        var currentPlayerPropertyArray = tempPlayerArray[currentPlayer - 1][2]; // I've realised I've used a lot of different methods for these arrays... needs cleaning up

        var newPlayerPropertyArrayLength = currentPlayerPropertyArray.length;
        if (!newPlayerPropertyArrayLength) {
            newPlayerPropertyArrayLength = 0;
        }

        var newPlayerPropertyArray = new Array(newPlayerPropertyArrayLength + 1); // creates a new array one index bigger than the current player's previous property array
        for (var index = 0; index < currentPlayerPropertyArray.length + 1; index++) {
            if (index === currentPlayerPropertyArray.length) { // checks if the current index is the last index
                newPlayerPropertyArray[index] = propertyToBuy; // adds the new property to the current player's owned properties
            } else {
                newPlayerPropertyArray[index] = currentPlayerPropertyArray[index];
            }
        }

        tempPlayerArray[currentPlayer - 1][2] = newPlayerPropertyArray;

        this.setState(
            {
                playerArray: tempPlayerArray
            }
        );

        // should properties have an extra field to say whether they've been purchased or not
        // or should we search through the player's owned properties to see whether they own it...
        // OR should we search for whether the property is owned in the thing that saves the game
    }

    endTurn = () => {
        const { currentPlayer, playerArray } = this.state;

        var numberOfPlayers = playerArray.length;
        var nextPlayer = currentPlayer + 1;
        if (nextPlayer > numberOfPlayers) {
            nextPlayer = 1;
        }

        this.setState(
            {
                currentPlayer: nextPlayer,
                hasRolled: false
            }
        )
    }

    render() {
        const { currentPlayer, currentProperty, dice1, dice2, hasRolled, isProperty, playerArray } = this.state;
        return (
            <div id='board-div'>
                <div id='board-information-div'>
                    <p>Current player: {currentPlayer}</p>
                    <button onClick={this.rollDiceUpdatePlayerPosition} disabled={hasRolled}>Roll Dice</button>
                    <p>Roll 1: {dice1}</p>
                    <p>Roll 2: {dice2}</p>
                    <p>Current property: {currentProperty}</p>
                    <button onClick={this.buyProperty} disabled={!hasRolled && !isProperty}>Buy Property</button>
                    <button onClick={this.endTurn} disabled={!hasRolled}>End Turn</button>
                </div>
                <br />
                {playerArray.map((player, index) => <div className='player-div' id={'player-' + (index + 1)}>
                    <p>Player {index + 1}</p>
                    <p>Current position: {player[0]}</p>
                    <p>Current property: {player[1]}</p>
                    <p>Owned properties:</p>
                    {player[2].map((property, index) => <div className='property-div' id={'player-' + (index + 1) + '-properties'}>
                        <p>{property}</p>
                    </div>)}
                </div>)}
            </div>
        );
    }
}

export default Board;