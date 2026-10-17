package gestorcatalogomusical.service;

import gestorcatalogomusical.model.Album;
import gestorcatalogomusical.persistence.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class AlbumService implements StructService <Album,Long> {

    private AlbumRepository repo;

    public AlbumService(AlbumRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Album> findAll() {
        return repo.findAll();
    }

    @Override
    public List<Album> findByName(String n) {
        return repo.findAlbumByNameIgnoreCase(n);
    }

    @Override
    public Album findById(Long aLong) {

        return repo.findById(aLong).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Álbum no encontrado"));
    }

    @Override
    public Album add(Album album) {

        return repo.save(album);
    }

    @Override
    public void deleteById(Long id) {
            repo.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Álbum no encontrado"));

            repo.deleteById(id);


    }

    @Override
    public Album update(Album album) {

       Album a= repo.findById(album.getId()).orElseThrow(() -> new ResponseStatusException(
               HttpStatus.NOT_FOUND, "Álbum no encontrado"));

       a.setName(album.getName());
       a.setAmountsongs(album.getAmountsongs());
       a.setRelease(album.getRelease());
       return repo.save(a);
    }
}
