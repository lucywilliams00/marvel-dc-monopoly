package main.marveldcmonopolyproject.models.actions;

import javax.persistence.*;

@Entity
@Table(name = "action")
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EAction action;

    public Action() {

    }

    public Action(EAction action) {
        this.action = action;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EAction getAction() {
        return action;
    }

    public void setAction(EAction action) {
        this.action = action;
    }
}
