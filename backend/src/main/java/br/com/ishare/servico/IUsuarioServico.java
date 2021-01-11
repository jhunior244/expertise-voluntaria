package br.com.ishare.servico;


import br.com.ishare.entidade.usuario.Usuario;

public interface IUsuarioServico {

    boolean existeUsuarioCadastradoComEmail(String email);

    Usuario cria(Usuario usuario) throws Exception;
}
