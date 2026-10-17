package gestorcatalogomusical.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Entity
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Getter
@Setter

public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY);
    private Long id;

    private String name;
    private Date release;
    private int amount;
}
