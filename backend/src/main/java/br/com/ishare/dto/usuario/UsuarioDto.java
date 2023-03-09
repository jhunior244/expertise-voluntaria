package br.com.ishare.dto.usuario;

import lombok.Data;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.List;
import java.util.UUID;

@Data
public class UsuarioDto {

    private UUID id;

    private String nome;

    private String email;

    private String telefone;

    private String token;

    private String senha;

    private EnderecoDto endereco;

    private TipoUsuarioDto tipoUsuario;

    private List<AreaAtuacaoDto> listaAreaAtuacao;

    public UsernamePasswordAuthenticationToken converter() {
        return new UsernamePasswordAuthenticationToken(email, senha);
    }
}
