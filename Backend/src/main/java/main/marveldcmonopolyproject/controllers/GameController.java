package main.marveldcmonopolyproject.controllers;

import main.marveldcmonopolyproject.models.Property;
import main.marveldcmonopolyproject.models.board.PositionType;
import main.marveldcmonopolyproject.models.games.Game;
import main.marveldcmonopolyproject.payload.request.*;
import main.marveldcmonopolyproject.payload.response.CreateGameResponse;
import main.marveldcmonopolyproject.payload.response.MessageResponse;
import main.marveldcmonopolyproject.repositories.PropertyRepository;
import main.marveldcmonopolyproject.repositories.PositionRepository;
import main.marveldcmonopolyproject.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    PropertyRepository propertyRepository;

    @Autowired
    PositionRepository positionRepository;

    @Autowired
    GameRepository gameRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createGame(@Valid @RequestBody CreateGameRequest createGameRequest) {
        Game game = new Game(createGameRequest.getGameName(), createGameRequest.getGameNumberOfRounds());

        gameRepository.save(game);

        return ResponseEntity.ok(new CreateGameResponse("Game created successfully!", gameRepository.findTopByOrderByIdDesc().getId()));
    }

    // we'll need another thing to display all the saved games associated with the user
    @GetMapping("/load/{gameID}") // this should be modelled after sign-in in AuthController
    public ResponseEntity<Game> loadGame(@PathVariable("gameID") Integer gameID) {
        // the game names should be unique to each user... but for now they're all unique
        Optional<Game> game = gameRepository.findById(gameID);

        if (game.isPresent()) {
            return new ResponseEntity<>(game.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/save") // this should be modelled after sign-up in AuthController
    public ResponseEntity<?> saveGame(@Valid @RequestBody SaveGameRequest saveGameRequest) {
        Game newGame = new Game(saveGameRequest.getGameName(), saveGameRequest.getGameNumberOfPlayers());

        gameRepository.save(newGame);

        return ResponseEntity.ok(new MessageResponse("Game saved successfully!"));
    }

    @GetMapping("/all-saved-games")
    public ResponseEntity<List<Game>> getAllSavedGames() {
        try {
            List<Game> savedGames = new ArrayList<Game>();

            gameRepository.findAll().forEach(savedGames::add);

            if (savedGames.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(savedGames, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/properties/all")
    public ResponseEntity<List<Property>> getAllProperties() {
        try {
            List<Property> properties = new ArrayList<Property>();

            propertyRepository.findAll().forEach(properties::add);

            if (properties.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(properties, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/properties/{id}")
    public ResponseEntity<Property> getPropertyByPosition(@PathVariable("id") Integer propertyId) {
        Optional<Property> property = propertyRepository.findById(propertyId);

        if (property.isPresent()) {
            return new ResponseEntity<>(property.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/properties/get-name-of/{id}")
    public ResponseEntity<String> getPropertyName(@PathVariable("id") Integer propertyId) {
        Optional<Property> property = propertyRepository.findById(propertyId);

        if (property.isPresent()) {
            return new ResponseEntity<>(property.get().getName(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/properties/get-collection-of/{id}")
    public ResponseEntity<String> getCollectionName(@PathVariable("id") Integer propertyId) {
        Optional<Property> property = propertyRepository.findById(propertyId);

        if (property.isPresent()) {
            return new ResponseEntity<>(property.get().getCollection().toString(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/board/get-position-type/{position}")
    public ResponseEntity<String> getPositionType(@PathVariable("position") Integer position) {
        Optional<PositionType> positionType = positionRepository.findByPosition(position);

        if (positionType.isPresent()) {
            return new ResponseEntity<>(positionType.get().getType().name(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
