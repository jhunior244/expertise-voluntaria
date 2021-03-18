package br.com.ishare.repositorio.publicacao;

import br.com.ishare.entidade.publicacao.Publicacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface PublicacaoJpaRepositoryCustom {

    Page<Publicacao> lista(Long[] listaIdEstado, Long[] listaIdCidade, List<UUID> listaIdAreaAtuacao, Long[] listaIdTipoUsuario, Long mostrarApenasMinhasPublicacoes, UUID idUsuarioLogado, Pageable pagina);
}
