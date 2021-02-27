package br.com.ishare.dto.usuario;

import lombok.Data;

import java.io.Serializable;

@Data
public class TipoUsuarioDto implements Serializable {
    private Long id;

    private String nome;
}
