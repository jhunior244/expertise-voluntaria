package br.com.ishare.servico;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.repositorio.UsuarioJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@Transactional
public class UsuarioServico implements IUsuarioServico {

    @Autowired
    private UsuarioJpaRepository usuarioJpaRepository;

    @Override
    public boolean existeUsuarioCadastradoComEmail(String email){
        Usuario usuario = usuarioJpaRepository.findByEmail(email);

        return usuario != null ? true : false;
    }

    @Override
    public Usuario cria(Usuario usuario) throws IShareExcessao {
        Usuario usuarioBanco = usuarioJpaRepository.findByEmail(usuario.getEmail());
        if (usuarioBanco != null){
            throw new IShareExcessao("Email já existe", HttpStatus.BAD_REQUEST);
        }
        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
        usuario = usuarioJpaRepository.save(usuario);
        return usuario;
    }


}
