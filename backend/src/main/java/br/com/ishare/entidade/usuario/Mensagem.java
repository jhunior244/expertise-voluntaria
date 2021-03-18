package br.com.ishare.entidade.usuario;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Data
public class Mensagem {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Type(type = "uuid-char")
    private UUID id;

    @Column(length = 1000, nullable = false)
    private String texto;

    @Column(nullable = false)
    private ZonedDateTime data;

    @ManyToOne(optional = false)
    private Usuario usuarioRemetente;

    @ManyToOne(optional = false)
    private Usuario usuarioDestinatario;
}
