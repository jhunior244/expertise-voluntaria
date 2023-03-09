package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.Cidade;

public interface CidadeJpaRepositoryCustom {
    Cidade obtem(String nome, String uf);
}
