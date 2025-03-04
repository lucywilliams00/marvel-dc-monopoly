package main.marveldcmonopolyproject.payload.request;

import javax.validation.constraints.NotBlank;

public class SaveGameRequest {
    @NotBlank
    private String gameName;

    @NotBlank
    private Integer gameNumberOfPlayers;

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String name) {
        this.gameName = name;
    }

    public Integer getGameNumberOfPlayers() {
        return gameNumberOfPlayers;
    }

    public void setGameNumberOfPlayers(Integer gameNumberOfPlayers) {
        this.gameNumberOfPlayers = gameNumberOfPlayers;
    }
}
