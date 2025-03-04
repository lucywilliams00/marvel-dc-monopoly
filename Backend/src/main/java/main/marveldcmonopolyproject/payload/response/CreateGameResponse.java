package main.marveldcmonopolyproject.payload.response;

public class CreateGameResponse {
    private String message;
    private Integer gameID;

    public CreateGameResponse(String message, Integer gameID) {
        this.message = message;
        this.gameID = gameID;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getGameID() {
        return gameID;
    }

    public void setGameID(Integer gameID) {
        this.gameID = gameID;
    }
}
