package main.marveldcmonopolyproject.repositories;

import main.marveldcmonopolyproject.models.roles.ERole;
import main.marveldcmonopolyproject.models.roles.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
