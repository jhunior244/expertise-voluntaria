package br.com.ishare.servico.usuario;

import br.com.ishare.entidade.usuario.Estado;
import br.com.ishare.entidade.usuario.TipoUsuario;

import java.util.List;

public interface IEstadoServico {
    List<Estado> lista();

    Estado obtem(String uf);
}
