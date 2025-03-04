package main.marveldcmonopolyproject.repositories;

import main.marveldcmonopolyproject.models.board.PositionType;
import main.marveldcmonopolyproject.models.games.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Integer> {
    Optional<Game> findByName(String name);

    Boolean existsByName(String name);

    Game findTopByOrderByIdDesc();
}
