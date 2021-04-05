package br.com.ishare.servico.usuario;

import br.com.ishare.dto.usuario.ConversaDto;
import br.com.ishare.entidade.usuario.Conversa;
import br.com.ishare.entidade.usuario.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IConversaServico {

    Page<ConversaDto> listaParaChat(UUID usuarioLogado, Pageable pagina);

    Conversa cria(ConversaDto conversa, Usuario usuarioLogado);

    Conversa atualizaDataUltimaVisualizacao(Conversa conversa, Usuario usuarioLogado);
}
