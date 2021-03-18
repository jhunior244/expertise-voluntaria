package br.com.ishare.servico.usuario;


import br.com.ishare.dto.usuario.UsuarioDto;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.entidade.usuario.UsuarioTelaContatoDto;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface IUsuarioServico {

    boolean existeUsuarioCadastradoComEmail(String email);

    Usuario obtemPorToken(String token);

    void cria(UsuarioDto usuario) throws Exception;

    Page<Usuario> lista(boolean ignoraUsuarioLogado, String emailUsuarioLogado, Long[] listaIdEstado, Long[] listaIdCidade, List<UUID> listaIdAreaAtuacao, String nome, Pageable pagina);

    Page<UsuarioTelaContatoDto> paraUsuarioTelaConsultaDto(Page<Usuario> paginaConteudo, Usuario usuario);

    UsuarioTelaContatoDto adicionaContato(UsuarioTelaContatoDto usuarioTelaContatoDto, Usuario usuarioLogado);

    UsuarioTelaContatoDto paraUsuarioTelaConsultaDto(@NotNull Usuario usuario, @NotNull Usuario usuarioLogado);

    Usuario obtem(UUID fromString);
}
