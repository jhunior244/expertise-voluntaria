package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.Conversa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ConversaJpaRepositoryCustom {
    Page<Conversa> listaParaChat(UUID usuarioLogado, Pageable pagina);
}
