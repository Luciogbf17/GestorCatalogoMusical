package gestorcatalogomusical.service;

import gestorcatalogomusical.model.Album;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

public interface StructService <T,ID> {
    List<T> findAll();
    List<T> findByName(String n);
    T findById(ID id);
    T add(T t);
    void deleteById(ID id);
    T update(T t);

}
