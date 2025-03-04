package main.marveldcmonopolyproject.models;

import main.marveldcmonopolyproject.models.actions.Action;
import main.marveldcmonopolyproject.models.effects.Effect;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "chance_card")
public class ChanceCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(	name = "community_action",
            joinColumns = @JoinColumn(name = "community_id"),
            inverseJoinColumns = @JoinColumn(name = "action_id"))
    private Action action;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(	name = "community_effect",
            joinColumns = @JoinColumn(name = "community_id"),
            inverseJoinColumns = @JoinColumn(name = "effect_id"))
    private Effect effect;

    public ChanceCard() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public Effect getEffect() {
        return effect;
    }

    public void setEffect(Effect effect) {
        this.effect = effect;
    }
}
