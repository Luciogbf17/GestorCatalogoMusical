package gestorcatalogomusical.controlador.BandController;

import gestorcatalogomusical.model.Entidad;
import gestorcatalogomusical.service.EntidadService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entidades")
public class controller {

    private final EntidadService service;

    public controller(EntidadService service) {
        this.service = service;
    }

    @GetMapping
    public List<> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Entidad getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Entidad create(@RequestBody Entidad entidad) {
        return service.save(entidad);
    }

    @PutMapping("/{id}")
    public Entidad update(@PathVariable Long id, @RequestBody Entidad entidad) {
        entidad.setId(id);
        return service.save(entidad);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
}