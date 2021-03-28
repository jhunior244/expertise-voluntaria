package br.com.ishare.servico.usuario;

import br.com.ishare.entidade.usuario.Mensagem;
import br.com.ishare.entidade.usuario.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface IMensagemServico {
    Page<Mensagem> lista(UUID idConversa, Pageable pageable);

    Mensagem enviaMensagem(Mensagem mensagem, Usuario usuario);

    List<Mensagem> atualizaMensagem(UUID idConversa, UUID idUltimaMensagem);
}
