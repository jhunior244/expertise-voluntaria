package br.com.ishare.dto.certificado;

import br.com.ishare.dto.avaliacao.AvaliacaoDto;
import br.com.ishare.dto.publicacao.ImagemDto;
import br.com.ishare.dto.publicacao.PublicacaoDto;
import br.com.ishare.dto.usuario.AreaAtuacaoDto;
import br.com.ishare.dto.usuario.UsuarioSimplesDto;
import lombok.Data;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public class CertificadoDto implements Serializable {

    private UUID id;

    private String conteudo;

    private String tempoTrabalhado;

    private ZonedDateTime dataCriacao;

    private UsuarioSimplesDto usuario;

    private UsuarioSimplesDto usuarioResponsavelCriacao;

    private AreaAtuacaoDto areaAtuacao;

    private ImagemDto imagem;

    private PublicacaoDto publicacao;

    private AvaliacaoDto avaliacao;
}
