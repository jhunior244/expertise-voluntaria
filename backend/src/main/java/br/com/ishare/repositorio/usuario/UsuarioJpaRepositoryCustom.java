package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.publicacao.Publicacao;
import br.com.ishare.entidade.usuario.Usuario;

import java.util.List;
import java.util.UUID;

public interface UsuarioJpaRepositoryCustom {
    List<Usuario> listaPorExpertisesPublicacao(List<UUID> listaIdAreaAtuacao);
}
