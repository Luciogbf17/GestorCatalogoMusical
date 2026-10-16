package Luchofarah.gestorcatalogomusical.Model;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Getter
@Setter

public class Band {
    private String name;
    private String ubication;
    private String genere;

}
