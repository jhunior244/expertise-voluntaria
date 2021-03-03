package br.com.ishare.servico.usuario;

import br.com.ishare.entidade.usuario.Estado;
import br.com.ishare.repositorio.usuario.EstadoJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class EstadoServico implements IEstadoServico{

    @Autowired
    private EstadoJpaRepository estadoJpaRepository;

    @Override
    public List<Estado> lista(String uf){
        return estadoJpaRepository.lista(uf);
    }
    @Override
    public Estado obtem(String uf){
        return estadoJpaRepository.findByUf(uf);
    }
}
