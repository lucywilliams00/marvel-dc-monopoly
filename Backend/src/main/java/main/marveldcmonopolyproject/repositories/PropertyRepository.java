package main.marveldcmonopolyproject.repositories;

import main.marveldcmonopolyproject.models.Property;
import main.marveldcmonopolyproject.models.collections.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PropertyRepository extends JpaRepository<Property, Integer> {
    Optional<Property> findById(Integer propertyId);
}
