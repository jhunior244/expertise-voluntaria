package br.com.ishare.dto.usuario;

import lombok.Data;

@Data
public class CidadeDto {

    private Long id;

    private String nome;

    private EstadoDto estado;
}
