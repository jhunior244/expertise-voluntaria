package br.com.ishare.dto.usuario;

import lombok.Data;

import java.util.UUID;

@Data
public class EnderecoDto {

    private UUID id;

    private String rua;

    private String cep;

    private String numero;

    private String bairro;

    private CidadeDto cidade;
}
