package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface UsuarioJpaRepositoryCustom {
    List<Usuario> listaPorExpertisesPublicacao(List<UUID> listaIdAreaAtuacao);

    Page<Usuario> lista(boolean ignoraUsuarioLogado, String emailUsuarioLogado, Long[] listaIdEstado, Long[] listaIdCidade, List<UUID> listaIdAreaAtuacao, String nome, Pageable pagina);

    Boolean usuarioEhContato(UUID usuario, UUID possivelContato);
}
