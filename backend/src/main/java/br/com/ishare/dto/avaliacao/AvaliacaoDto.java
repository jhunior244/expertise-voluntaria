package br.com.ishare.dto.avaliacao;

import br.com.ishare.dto.usuario.UsuarioSimplesDto;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
public class AvaliacaoDto implements Serializable {

    private UUID id;

    private Long nota;

    private UsuarioSimplesDto usuario;

    private UsuarioSimplesDto usuarioAvaliador;

}
