package main.marveldcmonopolyproject.payload.request;

import javax.validation.constraints.NotBlank;

public class LoadGameRequest {
    // I'm sure that in EPiC the user data got sent through everytime, so the methods below wouldn't be needed??
    @NotBlank
    private String gameName;

    @NotBlank
    private String user;

    public String getName() {
        return gameName;
    }

    public void setName(String name) {
        this.gameName = name;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
