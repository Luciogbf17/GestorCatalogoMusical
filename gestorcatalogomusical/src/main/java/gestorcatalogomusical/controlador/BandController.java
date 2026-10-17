package gestorcatalogomusical.controlador;

import gestorcatalogomusical.model.Band;
import gestorcatalogomusical.model.Song;
import gestorcatalogomusical.service.StructService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/band")
public class BandController extends BaseController<Band,Long>{

    protected BandController(StructService<Band, Long> service) {
        super(service);
    }

    @PostMapping("/")
    public Band create(@RequestBody Band b) { return service.add(b); }

    @PutMapping("/{id}")
    public Band update(@PathVariable Long id, @RequestBody Band band) {
        band.setId(id);
        return service.update(band);
    }






}
