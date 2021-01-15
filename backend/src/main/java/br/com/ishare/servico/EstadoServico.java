package br.com.ishare.servico;

import br.com.ishare.entidade.usuario.Estado;
import br.com.ishare.repositorio.EstadoJpaRepository;
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
    public List<Estado> lista(){
        return estadoJpaRepository.findAll();
    }
    @Override
    public Estado obtem(String uf){
        return estadoJpaRepository.findByUf(uf);
    }
}
