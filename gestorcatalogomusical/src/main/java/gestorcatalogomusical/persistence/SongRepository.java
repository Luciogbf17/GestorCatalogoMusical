package gestorcatalogomusical.persistence;

import gestorcatalogomusical.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {
}
