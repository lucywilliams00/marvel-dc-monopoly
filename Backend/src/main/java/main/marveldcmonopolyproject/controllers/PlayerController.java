package main.marveldcmonopolyproject.controllers;

import main.marveldcmonopolyproject.models.Property;
import main.marveldcmonopolyproject.models.User;
import main.marveldcmonopolyproject.models.games.Game;
import main.marveldcmonopolyproject.models.games.Player;
import main.marveldcmonopolyproject.payload.request.CreatePlayerRequest;
import main.marveldcmonopolyproject.payload.response.MessageResponse;
import main.marveldcmonopolyproject.repositories.GameRepository;
import main.marveldcmonopolyproject.repositories.PlayerRepository;
import main.marveldcmonopolyproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/player")
public class PlayerController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    GameRepository gameRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createPlayer(@Valid @RequestBody CreatePlayerRequest createPlayerRequest) {
        Player player = new Player(null, gameRepository.getById(createPlayerRequest.getGameID()), createPlayerRequest.getPlayerName(), createPlayerRequest.getCharacterName(), 0, 0, null, 0, 0, null, false);

        playerRepository.save(player);

        return ResponseEntity.ok(new MessageResponse("Player created successfully!"));
    }

    @GetMapping("/load/{gameID}")
    public ResponseEntity<List<Player>> loadGame(@PathVariable("gameID") Integer gameID) {
        try {
            List<Player> players = new ArrayList<Player>();

            playerRepository.findByGameId(gameID).forEach(players::add);

            if (players.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(players, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
