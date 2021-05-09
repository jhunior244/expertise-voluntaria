package br.com.ishare.servico.avaliacao;

import br.com.ishare.entidade.usuario.Usuario;

import java.util.UUID;

public interface IAvaliacaoServico {
    void cria(Long avaliacao, UUID fromString, Usuario usuarioLogado);
}
