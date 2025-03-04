import axios from "axios";
// import authenticationToken from "./AuthenticationToken";

const API_URL = "http://localhost:8080/api/game/";

class GameService {
    createGame(gameName, gameNumberOfRounds) {
        return axios.post(API_URL + "create", { gameName, gameNumberOfRounds })
    }

    loadGame(gameID) {
        return axios.post(API_URL + `load/${gameID}`);
    }

    saveGame(gameName) {
        return axios.post(API_URL + "save", { gameName });
    }

    getAllSavedGames() {
        return axios.get(API_URL + "all-saved-games");
    }

    getAllProperties() {
        return axios.get(API_URL + "properties/all");
    }

    getPropertyById(id) {
        return axios.get(API_URL + `properties/${id}`);
    }

    getPropertyName(id) {
        return axios.get(API_URL + `properties/get-name-of/${id}`);
    }

    getPositionType(position) {
        return axios.get(API_URL + `board/get-position-type/${position}`);
    }
}

export default new GameService();