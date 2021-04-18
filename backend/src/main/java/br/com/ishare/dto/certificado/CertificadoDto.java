package br.com.ishare.dto.certificado;

import br.com.ishare.dto.publicacao.ImagemDto;
import br.com.ishare.dto.usuario.UsuarioSimplesDto;
import lombok.Data;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public class CertificadoDto implements Serializable {

    private UUID id;

    private String conteudo;

    private Integer diasTrabalho;

    private ZonedDateTime dataCriacao;

    private UsuarioSimplesDto usuario;

    private UsuarioSimplesDto usuarioResponsavelCriacao;

    private ImagemDto imagem;
}