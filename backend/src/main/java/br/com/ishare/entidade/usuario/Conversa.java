package br.com.ishare.entidade.usuario;

import br.com.ishare.dto.usuario.UsuarioSimplesDto;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.util.CollectionUtils;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Conversa {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Type(type = "uuid-char")
    private UUID id;

    private ZonedDateTime dataCriacao;

    private ZonedDateTime dataUltimaModificacao;

    private ZonedDateTime dataUltimaVisualizacaoUsuarioUm;

    private ZonedDateTime dataUltimaVisualizacaoUsuarioDois;

    @ManyToOne
    private Usuario usuarioUm;

    @ManyToOne
    private Usuario usuarioDois;

    @OneToMany(mappedBy = "conversa")
    private List<Mensagem> listaMensagem;

    public UsuarioSimplesDto getContato(UUID usuarioLogado){
        if(usuarioLogado == null){
            return null;
        }
        UsuarioSimplesDto usuarioSimplesDto = new UsuarioSimplesDto();
        if(getUsuarioUm().getId().equals(usuarioLogado)){
            usuarioSimplesDto.setId(getUsuarioDois().getId());
            usuarioSimplesDto.setNome(getUsuarioDois().getNome());
            usuarioSimplesDto.setEmail(getUsuarioDois().getEmail());
        } else {
            usuarioSimplesDto.setId(getUsuarioUm().getId());
            usuarioSimplesDto.setNome(getUsuarioUm().getNome());
            usuarioSimplesDto.setEmail(getUsuarioUm().getEmail());
        }

        return usuarioSimplesDto;
    }

    public Long getNovasMensagens(UUID usuarioLogado){
        if(usuarioLogado == null || CollectionUtils.isEmpty(getListaMensagem())){
            return 0L;
        }
        try {
            ZonedDateTime dataUltimaVisualizacaoUsuarioLogado = getUsuarioUm().getId().equals(usuarioLogado) ? getDataUltimaVisualizacaoUsuarioUm() : getDataUltimaVisualizacaoUsuarioDois();

            return getListaMensagem().stream().filter(m -> dataUltimaVisualizacaoUsuarioLogado == null ||
                                                                            !m.getUsuario().getId().equals(usuarioLogado) && m.getData().isAfter(dataUltimaVisualizacaoUsuarioLogado)).count();
        } catch (Exception e){
            return 0L;
        }
    }
}
