package gestorcatalogomusical.controlador;

import gestorcatalogomusical.model.Album;
import gestorcatalogomusical.model.Band;
import gestorcatalogomusical.model.Song;
import gestorcatalogomusical.service.StructService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/album")
public class AlbumController extends BaseController<Album,Long>{


    protected AlbumController(StructService<Album, Long> service) {
        super(service);
    }


    @PostMapping("/")
    public Album create(@RequestBody Album a) { return service.add(a); }

    @PutMapping("/{id}")
    public Album update(@PathVariable Long id, @RequestBody Album a) {
        a.setId(id);
        return service.update(a);
    }
}
