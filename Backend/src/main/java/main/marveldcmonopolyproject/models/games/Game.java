package main.marveldcmonopolyproject.models.games;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table( name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(max = 30)
    private String name;

    @NotNull
    private Integer number_of_rounds;

    public Game() {
    } // is this needed?? answer: seems it's needed for the below Game function

    public Game(String name, Integer numberOfRounds) {
        this.name = name;
        this.number_of_rounds = numberOfRounds;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNumberOfRounds() {
        return number_of_rounds;
    }

    public void setNumberOfRounds(Integer numberOfRounds) {
        this.number_of_rounds = numberOfRounds;
    }
}
