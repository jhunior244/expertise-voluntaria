package br.com.ishare.servico.usuario;

import br.com.ishare.entidade.usuario.AreaAtuacao;
import br.com.ishare.repositorio.usuario.AreaAtuacaoJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AreaAtuacaoServico implements IAreaAtuacaoServico {

    @Autowired
    private AreaAtuacaoJpaRepository areaAtuacaoJpaRepository;

    @Override
    public Page<AreaAtuacao> lista(Pageable pagina) {
        return areaAtuacaoJpaRepository.findAll(pagina);
    }
}
