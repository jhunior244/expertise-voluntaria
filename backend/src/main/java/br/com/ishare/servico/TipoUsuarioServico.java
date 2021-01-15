package br.com.ishare.servico;

import br.com.ishare.entidade.usuario.TipoUsuario;
import br.com.ishare.repositorio.TipoUsuarioJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class TipoUsuarioServico implements ITipoUsuarioServico {

    @Autowired
    private TipoUsuarioJpaRepository tipoUsuarioJpaRepository;

    @Override
    public List<TipoUsuario> lista(){
        return tipoUsuarioJpaRepository.findAll();
    }
}
