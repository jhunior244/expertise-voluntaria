package br.com.ishare.dto.usuario;

import lombok.Data;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.UUID;

@Data
public class UsuarioDto {

    private UUID id;

    private String nome;

    private String email;

    private String token;

    private String senha;

    private EnderecoDto endereco;

    private TipoUsuarioDto tipoUsuario;

    public UsernamePasswordAuthenticationToken converter() {
        return new UsernamePasswordAuthenticationToken(email, senha);
    }
}
