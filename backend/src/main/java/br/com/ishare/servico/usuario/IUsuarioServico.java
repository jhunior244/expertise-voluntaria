package br.com.ishare.servico.usuario;


import br.com.ishare.dto.usuario.UsuarioDto;
import br.com.ishare.entidade.usuario.Usuario;

public interface IUsuarioServico {

    boolean existeUsuarioCadastradoComEmail(String email);

    Usuario obtemPorToken(String token);

    void cria(UsuarioDto usuario) throws Exception;
}
