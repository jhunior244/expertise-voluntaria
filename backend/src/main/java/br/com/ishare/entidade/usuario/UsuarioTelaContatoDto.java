package br.com.ishare.entidade.usuario;

import br.com.ishare.dto.usuario.AreaAtuacaoDto;
import br.com.ishare.dto.usuario.TipoUsuarioDto;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class UsuarioTelaContatoDto implements Serializable {

    private String id;

    private String nome;

    private String email;

    private String bairro;

    private String cidade;

    private String estado;

    private String tipoUsuarioNome;

    private Boolean ehContatoAdicionado;

    private List<AreaAtuacaoDto> listaAreaAtuacao;
}
