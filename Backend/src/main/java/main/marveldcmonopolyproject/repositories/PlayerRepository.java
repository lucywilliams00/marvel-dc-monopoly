package main.marveldcmonopolyproject.repositories;

import main.marveldcmonopolyproject.models.games.Game;
import main.marveldcmonopolyproject.models.games.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    List<Player> findByGame(Integer gameID);
}
