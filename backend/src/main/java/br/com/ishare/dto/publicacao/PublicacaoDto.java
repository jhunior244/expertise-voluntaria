package br.com.ishare.dto.publicacao;

import br.com.ishare.dto.usuario.AreaAtuacaoDto;
import br.com.ishare.dto.usuario.UsuarioSimplesDto;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class PublicacaoDto {

    private UUID id;

    private String descricao;

    private List<ImagemDto> listaImagem;

    private UsuarioSimplesDto usuario;

    private List<AreaAtuacaoDto> listaAreaAtuacao;
}
