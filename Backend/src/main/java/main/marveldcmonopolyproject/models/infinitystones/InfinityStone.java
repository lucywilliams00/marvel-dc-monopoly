package main.marveldcmonopolyproject.models.infinitystones;

import main.marveldcmonopolyproject.models.infinitystones.EInfinityStone;
import main.marveldcmonopolyproject.models.roles.ERole;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(	name = "infinity_stones",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        })
public class InfinityStone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Enumerated(EnumType.STRING)
    private EInfinityStone name;

    public EInfinityStone getName() {
        return name;
    }

    public void setName(EInfinityStone name) {
        this.name = name;
    }
}
