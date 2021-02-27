package br.com.ishare.servico.usuario;

import br.com.ishare.entidade.usuario.Cidade;

import java.util.List;

public interface ICidadeServico {
    Cidade obtem(String nome, String uf);

    List<Cidade> lista();
}
