package br.com.ishare.repositorio.avaliacao;

import br.com.ishare.entidade.usuario.Avaliacao;
import br.com.ishare.entidade.usuario.Certificado;
import br.com.ishare.entidade.usuario.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface AvaliacaoJpaRepositoryCustom {
    Page<Certificado> lista(Boolean ehOngOsc, List<UUID> lista, Long[] listaIdTipoUsuario, Usuario usuarioLogado, Pageable pagina);

    Certificado obtem(UUID idPublicacao, UUID idAreaAtuacao, UUID idUsuarioVoluntario);

    List<Avaliacao> lista(UUID idUsuario);
}
