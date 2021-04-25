package br.com.ishare.entidade.usuario;

import br.com.ishare.entidade.publicacao.Imagem;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Data
public class Certificado {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Type(type = "uuid-char")
    private UUID id;

    @Column(nullable = false)
    private String tempoTrabalhado;

    @Column(nullable = false)
    private ZonedDateTime dataCriacao;

    @ManyToOne(optional = false)
    private AreaAtuacao areaAtuacao;

    @OneToOne
    private Imagem imagem;

    @ManyToOne(optional = false)
    private Usuario usuario;

    @ManyToOne(optional = false)
    private Usuario usuarioResponsavelCriacao;
}
