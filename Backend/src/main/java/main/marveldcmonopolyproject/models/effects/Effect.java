package main.marveldcmonopolyproject.models.effects;

import main.marveldcmonopolyproject.models.actions.EAction;
import main.marveldcmonopolyproject.models.effects.EEffect;
import main.marveldcmonopolyproject.models.roles.ERole;

import javax.persistence.*;

@Entity
@Table(name = "effect")
public class Effect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EEffect effect;

    public Effect() {

    }

    public Effect(EEffect effect) {
        this.effect = effect;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EEffect getEffect() {
        return effect;
    }

    public void setEffect(EEffect effect) {
        this.effect = effect;
    }
}
