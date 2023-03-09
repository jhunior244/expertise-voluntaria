package br.com.ishare.dto.usuario;

import lombok.Data;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public class ConversaDto implements Serializable {

    private UUID id;

    private ZonedDateTime dataCriacao;

    private Long novasMensagems;

    private ZonedDateTime dataUltimaModificacao;

    private UsuarioSimplesDto contato;
}
