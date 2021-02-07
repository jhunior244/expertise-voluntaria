package br.com.ishare.entidade.publicacao;

import br.com.ishare.entidade.usuario.Usuario;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Publicacao {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Type(type = "uuid-char")
    private UUID id;

    @Column
    private String titulo;

    @Column(length = 2000)
    private String descricao;

    @OneToMany(mappedBy = "publicacao")
    private List<Imagem> listaImagem;

    @ManyToOne
    private Usuario usuario;

}
