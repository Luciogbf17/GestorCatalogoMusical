package gestorcatalogomusical.service;

import gestorcatalogomusical.model.Song;

import java.util.List;

public interface SongService {
    List<Song> findAll();
    List<Song> findByName(String name);
    void Save(Song s);
    void DeleteByName(Song s);



}
