package main.marveldcmonopolyproject.models.collections;

import javax.persistence.*;

@Entity
@Table(name = "collection")
public class Collection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ECollection name;

    public Collection() {

    }

    public Collection(ECollection name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ECollection getName() {
        return name;
    }

    public void setName(ECollection name) {
        this.name = name;
    }
}
