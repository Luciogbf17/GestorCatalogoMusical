package gestorcatalogomusical.persistence;

import gestorcatalogomusical.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface AlbumRepository extends JpaRepository<Album,Long> {
    List<Album> findAlbumByNameIgnoreCase(String name);


}
