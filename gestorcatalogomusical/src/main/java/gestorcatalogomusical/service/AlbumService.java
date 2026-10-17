package gestorcatalogomusical.service;

import gestorcatalogomusical.model.Album;

import java.util.List;

public interface AlbumService {
    List<Album> findAll();
    List<Album> findByName(String name);
    void addAlbum(Album a);
    void deleteAlbum(Album a);
}
