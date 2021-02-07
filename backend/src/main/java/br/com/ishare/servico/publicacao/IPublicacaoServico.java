package br.com.ishare.servico.publicacao;

import br.com.ishare.entidade.publicacao.Publicacao;
import br.com.ishare.entidade.usuario.Usuario;

import java.util.List;
import java.util.UUID;

public interface IPublicacaoServico {
    Publicacao cria(Publicacao publicacao, Usuario usuario);

    Publicacao obtem(UUID id);
}
