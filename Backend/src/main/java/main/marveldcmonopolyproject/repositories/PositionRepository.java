package main.marveldcmonopolyproject.repositories;

import main.marveldcmonopolyproject.models.Property;
import main.marveldcmonopolyproject.models.board.EPositionType;
import main.marveldcmonopolyproject.models.board.PositionType;
import main.marveldcmonopolyproject.models.collections.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PositionRepository extends JpaRepository<PositionType, Integer> {
    Optional<PositionType> findByPosition(Integer position);
}
