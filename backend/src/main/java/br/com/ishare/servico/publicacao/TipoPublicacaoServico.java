package br.com.ishare.servico.publicacao;

import br.com.ishare.entidade.publicacao.TipoPublicacao;
import br.com.ishare.repositorio.publicacao.TipoPublicacaoJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TipoPublicacaoServico implements ITipoPublicacaoServico {

    @Autowired
    private TipoPublicacaoJpaRepository tipoPublicacaoJpaRepository;

    @Override
    public List<TipoPublicacao> lista(){
        return tipoPublicacaoJpaRepository.findAll();
    }

}
