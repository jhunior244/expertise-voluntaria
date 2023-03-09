package br.com.ishare.dto.usuario;

import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;
import java.util.UUID;

@Data
public class AreaAtuacaoDto implements Serializable {
    private UUID id;

    private String nome;
}
