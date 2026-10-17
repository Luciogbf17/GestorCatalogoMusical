package gestorcatalogomusical.service;

import gestorcatalogomusical.model.Album;
import gestorcatalogomusical.model.Band;
import gestorcatalogomusical.persistence.BandRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@Service
@AllArgsConstructor
public class BandService implements StructService <Band,Long>{
    private BandRepository repo;


    @Override
    public List<Band> findAll() {
        return repo.findAll();
    }

    @Override
    public List<Band> findByName(String n) {
        return repo.findBandsByNameIgnoreCase(n);
    }

    @Override
    public Band findById(Long aLong) {
        return repo.findById(aLong)
                .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Banda no encontrada"));
    }

    @Override
    public Band add(Band b) {
        return repo.save(b);
    }

    @Override
    public void deleteById(Long id) {
        repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Banda no encontrada"));
        repo.deleteById(id);
    }

    @Override
    public Band update(Band band) {
        Band b= repo.findById(band.getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Banda no encontrada"));

        b.setGenere(band.getGenere());
        b.setName(band.getName());
        b.setUbication(band.getUbication());
        return repo.save(b);

    }
}
