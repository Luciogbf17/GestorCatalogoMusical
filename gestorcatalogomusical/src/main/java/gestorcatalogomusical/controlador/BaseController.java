package gestorcatalogomusical.controlador;

import gestorcatalogomusical.model.Band;
import gestorcatalogomusical.service.StructService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class BaseController<T, ID> {

    protected final StructService<T, ID> service;

    protected BaseController(StructService<T, ID> service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<T> findAll(){ return service.findAll(); }

    @GetMapping("/search")
    public List <T> findByName(@RequestParam String n){return service.findByName(n);}

    @GetMapping("/{id}")
    public T findById(@PathVariable ID id){return service.findById(id);}

    @DeleteMapping("/{id}")
   public void delete(@PathVariable ID id) { service.deleteById(id); }





}
