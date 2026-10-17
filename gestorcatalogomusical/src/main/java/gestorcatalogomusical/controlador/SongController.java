package gestorcatalogomusical.controlador;

import gestorcatalogomusical.model.Band;
import gestorcatalogomusical.model.Song;
import gestorcatalogomusical.service.StructService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/song")
public class SongController extends BaseController<Song,Long>{
    protected SongController(StructService<Song,Long> service) {
        super(service);
    }

    @PostMapping("/")
    public Song create(@RequestBody Song s) { return service.add(s);}

    @PutMapping("/{id}")
    public Song update(@PathVariable Long id, @RequestBody Song song) {
        song.setId(id);
        return service.update(song);
    }
}
