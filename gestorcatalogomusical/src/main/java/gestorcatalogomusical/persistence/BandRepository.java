package gestorcatalogomusical.persistence;

import gestorcatalogomusical.model.Band;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BandRepository extends JpaRepository<Band,Long> {
    List<Band> findBandsByGenere(String genere);

    List<Band> findBandsByNameIgnoreCase(String name);


}
