package br.com.ishare.servico.usuario;

import br.com.ishare.entidade.usuario.SetorEmpresa;
import br.com.ishare.repositorio.usuario.SetorEmpresaJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class SetorEmpresaServico implements ISetorEmpresaServico {

    @Autowired
    private SetorEmpresaJpaRepository setorEmpresaJpaRepository;

    @Override
    public Page<SetorEmpresa> lista(Pageable pagina) {
        return setorEmpresaJpaRepository.findAll(pagina);
    }
}
