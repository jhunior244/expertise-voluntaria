package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.Mensagem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface MensagemJpaRepositoryCustom {

    Page<Mensagem> lista(UUID idConversa, Pageable pageable);

    List<Mensagem> atualizaMensagem(UUID idConversa, Mensagem ultimaMensagem);
}
