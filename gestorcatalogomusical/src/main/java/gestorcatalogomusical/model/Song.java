package gestorcatalogomusical.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Getter
@Setter
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String isrc;
    private String name;
    
    @OneToOne
    private Band band;

    private Date release;

    @OneToMany
    private Album album;

    private String genere;
    private String spotifyurl;
    private String youtubeurl;
    private String appleurl;


}
