package br.com.ishare.dto.publicacao;

import lombok.Data;

import java.io.Serializable;

@Data
public class TipoPublicacaoDto implements Serializable {
    private Long id;

    private String nome;
}
