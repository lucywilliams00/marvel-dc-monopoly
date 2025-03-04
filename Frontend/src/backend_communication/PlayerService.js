import axios from "axios";
// import authenticationToken from "./AuthenticationToken";

const API_URL = "http://localhost:8080/api/player/";

class PlayerService {
    createPlayer(gameID, playerName, characterName) {
        return axios.post(API_URL + "create", { gameID, playerName, characterName })
    }

    loadPlayers(gameID) {
        return axios.get(API_URL + `load/${gameID}`);
    }
}

export default new PlayerService();