package br.com.ishare.dto.usuario;

import lombok.Data;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public class MensagemDto implements Serializable {

    private UUID id;

    private String texto;

    private ZonedDateTime data;

    private UsuarioSimplesDto usuario;

    private ConversaDto conversa;
}
