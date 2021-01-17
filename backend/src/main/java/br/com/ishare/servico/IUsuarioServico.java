package br.com.ishare.servico;


import br.com.ishare.dto.usuario.UsuarioDto;
import br.com.ishare.entidade.usuario.Usuario;

public interface IUsuarioServico {

    boolean existeUsuarioCadastradoComEmail(String email);

    void cria(UsuarioDto usuario) throws Exception;
}
