package gestorcatalogomusical.service;

import gestorcatalogomusical.model.Song;
import gestorcatalogomusical.persistence.SongRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SongService implements StructService<Song, Long> {

    private final SongRepository repo;

    public SongService(SongRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Song> findAll() {
        return repo.findAll();
    }

    @Override
    public List<Song> findByName(String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }

    @Override
    public Song findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Canción no encontrada"));
    }

    @Override
    public Song add(Song song) {
        return repo.save(song);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Canción no encontrada");
        }
        repo.deleteById(id);
    }

    @Override
    @Transactional
    public Song update(Song song) {
        Song s = repo.findById(song.getId()).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Canción no encontrada"));

        s.setName(song.getName());
        s.setAlbum(song.getAlbum());
        s.setBand(song.getBand());
        s.setIsrc(song.getIsrc());
        s.setRelease(song.getRelease());
        s.setAppleurl(song.getAppleurl());
        s.setYoutubeurl(song.getYoutubeurl());
        s.setSpotifyurl(song.getSpotifyurl());


        return repo.save(s);
    }
}