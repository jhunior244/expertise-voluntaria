package br.com.ishare.entidade.usuario;

import br.com.ishare.dto.usuario.AreaAtuacaoDto;
import br.com.ishare.dto.usuario.TipoUsuarioDto;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Data
public class UsuarioTelaContatoDto implements Serializable {

    private String id;

    private String nome;

    private String telefone;

    private String email;

    private String bairro;

    private String cidade;

    private String estado;

    private String tipoUsuarioNome;

    private Boolean ehContatoAdicionado;

    private BigDecimal mediaAvaliacao;

    private Integer totalAvaliacoes;

    private List<AreaAtuacaoDto> listaAreaAtuacao;
}
