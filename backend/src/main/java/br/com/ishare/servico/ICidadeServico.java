package br.com.ishare.servico;

import br.com.ishare.entidade.usuario.Cidade;

public interface ICidadeServico {
    Cidade obtem(String nome, String uf);
}
