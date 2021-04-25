package br.com.ishare.dto.usuario;

import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
public class UsuarioSaidaDto implements Serializable {

    private UUID id;

    private String nome;

    private String email;

    private String token;

    private String uf;

    private String cidade;

    private TipoUsuarioDto tipoUsuario;
}
