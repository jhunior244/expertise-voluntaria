package br.com.ishare.dto.usuario;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class UsuarioSimplesDto {

    private UUID id;

    private String nome;

    private String email;

    private String cidade;

    private String uf;

    private List<UsuarioSimplesDto> listaContato;
}
