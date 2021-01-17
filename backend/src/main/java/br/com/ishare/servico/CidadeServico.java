package br.com.ishare.servico;

import br.com.ishare.entidade.usuario.Cidade;
import br.com.ishare.repositorio.CidadeJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CidadeServico implements ICidadeServico {

    @Autowired
    private CidadeJpaRepository cidadeJpaRepository;

    @Override
    public Cidade obtem(String nome, String uf){
        return cidadeJpaRepository.obtem(nome, uf);
    }
}
