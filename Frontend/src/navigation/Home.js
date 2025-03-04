import React from 'react';

import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GameService from "../backend_communication/GameService";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            properties: [],
            error1: "",
            propertyId: [],
            error2: "",
            positionType: "",
            error3: "",
            name: "",
            error4: ""
        }
    }

    componentDidMount() {
        GameService.getAllProperties().then(response => {
            this.setState(
                {
                    properties: response.data
                }
            )
        }, error => {
            this.setState(
                {
                    error1: error.message
                }
            )
        });

        GameService.getPropertyById(1).then(response => {
            this.setState(
                {
                    propertyId: response.data
                }
            )
        }, error => {
            this.setState(
                {
                    error2: error.message
                }
            )
        });

        GameService.getPropertyName(2).then(response => {
            this.setState(
                {
                    name: response.data
                }
            )
        }, error => {
            this.setState(
                {
                    error4: error.message
                }
            )
        });

        GameService.getPositionType(1).then(response => {
            this.setState(
                {
                    positionType: response.data
                }
            )
        }, error => {
            this.setState(
                {
                    error3: error.message
                }
            )
        });
    }

    render() {
        const { properties, error1, propertyId, error2, name, error4, positionType, error3 } = this.state;
        return (
            <div id='Home-div'>
                <h1>Home</h1>
                {properties.map(property => <h3>{property.name}</h3>)}
                <p>{error1}</p>
                {propertyId.name}
                <p>{error2}</p>
                <h3>{name}</h3>
                <p>{error4}</p>
                <h3>{positionType}</h3>
                <p>{error3}</p>
            </div>
        );
    }
}

export default Home;