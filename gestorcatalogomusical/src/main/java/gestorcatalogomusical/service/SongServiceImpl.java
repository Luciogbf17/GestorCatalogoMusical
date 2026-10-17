package gestorcatalogomusical.service;

import gestorcatalogomusical.model.Song;

import java.util.List;

public class SongServiceImpl implements SongService {

    @Override
    public List<Song> findAll() {
        return List.of();
    }

    @Override
    public List<Song> findByName(String name) {
        return List.of();
    }

    @Override
    public void Save(Song s) {

    }

    @Override
    public void DeleteByName(Song s) {

    }
}
