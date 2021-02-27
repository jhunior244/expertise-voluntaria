package br.com.ishare.entidade.usuario;

import br.com.ishare.entidade.publicacao.Publicacao;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class AreaAtuacao {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Type(type = "uuid-char")
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @ManyToMany(mappedBy = "listaAreaAtuacao")
    private List<Usuario> listaUsuario;

    @ManyToMany(mappedBy = "listaAreaAtuacao")
    private List<Publicacao> listaPublicacao;
}
