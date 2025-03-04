package main.marveldcmonopolyproject.models.games;

import main.marveldcmonopolyproject.models.infinitystones.InfinityStone;
import main.marveldcmonopolyproject.models.Property;
import main.marveldcmonopolyproject.models.User;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table( name = "players")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    @Size(max = 30)
    private String player_name;

    private String character_name;

    private Integer current_position;

    private Integer balance;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "player_property",
            joinColumns = @JoinColumn(name = "player_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Property> owned_properties;

    private Integer get_out_of_jail_cards;

    private Integer current_lap;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "player_infinity_stone",
            joinColumns = @JoinColumn(name = "player_id"),
            inverseJoinColumns = @JoinColumn(name = "infinity_stone_id"))
    private Set<InfinityStone> owned_infinity_stones;

    private Boolean bankrupt;

    public Player() {
    } // is this needed?? answer: seems it's needed for the below Game function

    public Player(User user, Game game, String name, String characterName, Integer currentPosition, Integer balance, Set<Property> ownedProperties, Integer getOutOfJailCards, Integer getCurrentLap, Set<InfinityStone> getOwnedInfinityStones, Boolean bankrupt) {
        this.user = user;
        this.game = game;
        this.player_name = name;
        this.character_name = characterName;
        this.current_position = currentPosition;
        this.balance = balance;
        this.owned_properties = ownedProperties;
        this.get_out_of_jail_cards = getOutOfJailCards;
        this.current_lap = getCurrentLap;
        this.owned_infinity_stones = getOwnedInfinityStones;
        this.bankrupt = bankrupt;
    } // is this needed as well as the get and set below??

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public String getName() {
        return player_name;
    }

    public void setName(String name) {
        this.player_name = name;
    }

    public String getCharacter() {
        return character_name;
    }

    public void setCharacter(String character) {
        this.character_name = character;
    }

    public Integer getCurrentPosition() {
        return current_position;
    }

    public void setCurrentPosition(Integer currentPosition) {
        this.current_position = currentPosition;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public Set<Property> getOwnedProperties() {
        return owned_properties;
    }

    public void setOwnedProperties(Set<Property> ownedProperties) {
        this.owned_properties = ownedProperties;
    }

    public Integer getOutOfJailCards() {
        return get_out_of_jail_cards;
    }

    public void setGetOutOfJailCards(Integer getOutOfJailCards) {
        this.get_out_of_jail_cards = getOutOfJailCards;
    }

    public Integer getCurrentLap() {
        return current_lap;
    }

    public void setCurrentLap(Integer currentLap) {
        this.current_lap = currentLap;
    }

    public Set<InfinityStone> getOwnedInfinityStones() {
        return owned_infinity_stones;
    }

    public void setOwnedInfinityStones(Set<InfinityStone> ownedInfinityStones) {
        this.owned_infinity_stones = ownedInfinityStones;
    }

    public Boolean getBankrupt() {
        return bankrupt;
    }

    public void setBankrupt(Boolean bankrupt) {
        this.bankrupt = bankrupt;
    }
}
