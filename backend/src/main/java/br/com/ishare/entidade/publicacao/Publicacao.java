package br.com.ishare.entidade.publicacao;

import br.com.ishare.entidade.usuario.AreaAtuacao;
import br.com.ishare.entidade.usuario.Certificado;
import br.com.ishare.entidade.usuario.Usuario;
import com.querydsl.core.annotations.QueryInit;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.ZonedDateTime;
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
    private TipoPublicacao tipoPublicacao;

    private ZonedDateTime data;

    @ManyToOne
    @QueryInit({"endereco.cidade.estado", "tipoUsuario"})
    private Usuario usuario;

    @OneToOne(mappedBy = "publicacao")
    private Certificado certificado;

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
