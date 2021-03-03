package br.com.ishare.servico.publicacao;

import br.com.ishare.entidade.publicacao.Publicacao;
import br.com.ishare.entidade.usuario.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface IPublicacaoServico {
    Publicacao cria(Publicacao publicacao, Usuario usuario);

    Publicacao obtem(UUID id);

    Page<Publicacao> lista(Usuario usuario, Pageable pagina);

    Page<Publicacao> lista(Long[] listaIdEstado, Long[] listaIdCidade, List<UUID> listaIdAreaAtuacao, Pageable pagina);
}
