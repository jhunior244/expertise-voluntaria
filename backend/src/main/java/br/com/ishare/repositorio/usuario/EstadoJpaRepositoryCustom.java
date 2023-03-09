package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.Estado;

import java.util.List;

public interface EstadoJpaRepositoryCustom {
    List<Estado> lista(String uf);
}
