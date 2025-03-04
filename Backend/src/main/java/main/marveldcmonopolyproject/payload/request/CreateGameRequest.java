package main.marveldcmonopolyproject.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CreateGameRequest {
    @NotBlank
    private String gameName;

    @NotNull
    private Integer gameNumberOfRounds;

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public Integer getGameNumberOfRounds() {
        return gameNumberOfRounds;
    }

    public void setGameNumberOfRounds(Integer gameNumberOfRounds) {
        this.gameNumberOfRounds = gameNumberOfRounds;
    }
}
