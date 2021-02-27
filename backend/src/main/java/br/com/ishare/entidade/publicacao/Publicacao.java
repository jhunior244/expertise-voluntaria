package br.com.ishare.entidade.publicacao;

import br.com.ishare.entidade.usuario.AreaAtuacao;
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

    @Column(length = 2000)
    private String descricao;

    @ManyToOne
    private Usuario usuario;

    @OneToMany(mappedBy = "publicacao")
    private List<Imagem> listaImagem;

    @ManyToMany
    @JoinTable(
            name = "publicacaoListaAreaAtuacao",
            joinColumns = {
                    @JoinColumn(name = "publicacao_id", nullable = false, referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "area_atuacao_id", nullable = false, referencedColumnName = "id")
            }
    )
    private List<AreaAtuacao> listaAreaAtuacao;

}
