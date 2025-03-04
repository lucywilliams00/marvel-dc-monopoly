package main.marveldcmonopolyproject.models.board;

import javax.persistence.*;

@Entity
@Table(	name = "position_type",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "position")
        })
public class PositionType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer position;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EPositionType type;

    public Integer getPosition() {
        return position;
    }

    public EPositionType getType() {
        return type;
    }
}
