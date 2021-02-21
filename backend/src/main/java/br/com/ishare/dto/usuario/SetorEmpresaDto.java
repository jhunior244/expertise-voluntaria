package br.com.ishare.dto.usuario;

import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
public class SetorEmpresaDto implements Serializable {
    private UUID id;

    private String nome;
}
