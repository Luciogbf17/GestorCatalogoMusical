package gestorcatalogomusical.persistence;

import gestorcatalogomusical.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByNameContainingIgnoreCase(String name);
}
